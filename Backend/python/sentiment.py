import nltk
import random
# from nltk.corpus import movie_reviews
from nltk.classify.scikitlearn import SklearnClassifier
import pickle
from sklearn.naive_bayes import MultinomialNB, BernoulliNB
from sklearn.linear_model import LogisticRegression, SGDClassifier
from sklearn.svm import SVC, LinearSVC, NuSVC
from nltk.classify import ClassifierI
from statistics import mode
from nltk.tokenize import word_tokenize


class VoteClassifier(ClassifierI): 
    def __init__(self, *classifiers):
        self._classifiers = classifiers

    def classify(self, features):
        votes = []
        for c in self._classifiers:
            v = c.classify(features)
            votes.append(v)
        return mode(votes)

    def confidence(self, features):
        votes = []
        for c in self._classifiers:
            v = c.classify(features)
            votes.append(v)

        choice_votes = votes.count(mode(votes))
        conf = choice_votes / len(votes)
        return conf


short_pos = open("positive.txt", "r").read()
short_neg = open("negative.txt", "r").read()

# move this up here
all_words = []
documents = []

#  j is adject, r is adverb, and v is verb
allowed_word_types = ["J","R","V"]
# allowed_word_types = ["J"]

for p in short_pos.split('\n'):
    documents.append((p, "pos"))
    words = word_tokenize(p)
    pos = nltk.pos_tag(words)
    for w in pos:
        if w[1][0] in allowed_word_types:
            all_words.append(w[0].lower())

for p in short_neg.split('\n'):
    documents.append((p, "neg"))
    words = word_tokenize(p)
    pos = nltk.pos_tag(words)
    for w in pos:
        if w[1][0] in allowed_word_types:
            all_words.append(w[0].lower())

save_documents = open("pickled_algos/documents.pickle", "wb")
pickle.dump(documents, save_documents)
save_documents.close()

all_words = nltk.FreqDist(all_words)

word_features = list(all_words.keys())[:5000]

save_word_features = open("pickled_algos/word_features5k.pickle", "wb")
pickle.dump(word_features, save_word_features)
save_word_features.close()


def find_features(document):
    words = word_tokenize(document)
    features = {}
    for w in word_features:
        features[w] = (w in words)

    return features


featuresets = [(find_features(rev), category) for (rev, category) in documents]


random.shuffle(featuresets)

# save_featuresets = open("pickled_algos/featuresets.pickle", "wb")
# pickle.dump(featuresets, save_featuresets)
# save_featuresets.close()

# print(len(featuresets))

testing_set = featuresets[10000:]
training_set = featuresets[:10000]

classifier = nltk.NaiveBayesClassifier.train(training_set)
print("Original Naive Bayes Algo accuracy percent:", (nltk.classify.accuracy(classifier, testing_set)) * 100)
classifier.show_most_informative_features(15)

###############
save_classifier = open("pickled_algos/originalnaivebayes5k.pickle", "wb")
pickle.dump(classifier, save_classifier)
save_classifier.close()

# MNB_classifier = SklearnClassifier(MultinomialNB())
# MNB_classifier.train(training_set)
# print("MNB_classifier accuracy percent:", (nltk.classify.accuracy(MNB_classifier, testing_set)) * 100)
#
# save_classifier = open("pickled_algos/MNB_classifier5k.pickle", "wb")
# pickle.dump(MNB_classifier, save_classifier)
# save_classifier.close()
#
# BernoulliNB_classifier = SklearnClassifier(BernoulliNB())
# BernoulliNB_classifier.train(training_set)
# print("BernoulliNB_classifier accuracy percent:", (nltk.classify.accuracy(BernoulliNB_classifier, testing_set)) * 100)
#
# save_classifier = open("pickled_algos/BernoulliNB_classifier5k.pickle", "wb")
# pickle.dump(BernoulliNB_classifier, save_classifier)
# save_classifier.close()
#
# LogisticRegression_classifier = SklearnClassifier(LogisticRegression())
# LogisticRegression_classifier.train(training_set)
# print("LogisticRegression_classifier accuracy percent:",
#       (nltk.classify.accuracy(LogisticRegression_classifier, testing_set)) * 100)
#
# save_classifier = open("pickled_algos/LogisticRegression_classifier5k.pickle", "wb")
# pickle.dump(LogisticRegression_classifier, save_classifier)
# save_classifier.close()
#
# LinearSVC_classifier = SklearnClassifier(LinearSVC())
# LinearSVC_classifier.train(training_set)
# print("LinearSVC_classifier accuracy percent:", (nltk.classify.accuracy(LinearSVC_classifier, testing_set)) * 100)
#
# save_classifier = open("pickled_algos/LinearSVC_classifier5k.pickle", "wb")
# pickle.dump(LinearSVC_classifier, save_classifier)
# save_classifier.close()

##NuSVC_classifier = SklearnClassifier(NuSVC())
##NuSVC_classifier.train(training_set)
##print("NuSVC_classifier accuracy percent:", (nltk.classify.accuracy(NuSVC_classifier, testing_set))*100)


# SGDC_classifier = SklearnClassifier(SGDClassifier())
# SGDC_classifier.train(training_set)
# print("SGDClassifier accuracy percent:", nltk.classify.accuracy(SGDC_classifier, testing_set) * 100)
#
# save_classifier = open("pickled_algos/SGDC_classifier5k.pickle", "wb")
# pickle.dump(SGDC_classifier, save_classifier)
# save_classifier.close()


####### ALE MELE
#
# #MultinomialNB
# MNB_classifier = SklearnClassifier(MultinomialNB())
# #now we ve got a classifier and now we can do the exact same thing as we did before
#
# #we want to train the classifier
# MNB_classifier.train(training_set)
# # print("MNB_classifier accuracy percent: ", (nltk.classify.accuracy(MNB_classifier, testing_set)) * 100)
# save_classifierMNB = open("picked_algos/MNBclassifier.pickle", "wb")
# pickle.dump(MNB_classifier, save_classifierMNB)
# save_classifierMNB.close()
#
# #GaussianNB
# # GaussianNB_classifier = SklearnClassifier(GaussianNB())
# # GaussianNB_classifier.train(training_set)
# # print("GaussianNB_classifier accuracy percent: ", (nltk.classify.accuracy(GaussianNB_classifier, testing_set)) * 100)
#
#
# #BernoulliNB
# BernoulliNB_classifier = SklearnClassifier(BernoulliNB())
# BernoulliNB_classifier.train(training_set)
# # print("BernoulliNB_classifier accuracy percent: ", (nltk.classify.accuracy(BernoulliNB_classifier, testing_set)) * 100)
# save_classifierBernoulli = open("Bernoulliclassifier.pickle", "wb")
# pickle.dump(BernoulliNB_classifier, save_classifierBernoulli)
# save_classifierBernoulli.close()
#
# #   LogisticRegression, SGDClassifier
# #   SVC, LinearSVC, NuSVC
#
#
# LogisticRegression_classifier = SklearnClassifier(LogisticRegression())
# LogisticRegression_classifier.train(training_set)
# # print("LogisticRegression_classifier accuracy percent: ", (nltk.classify.accuracy(LogisticRegression_classifier, testing_set)) * 100)
# save_classifierLogistic = open("Logisticclassifier.pickle", "wb")
# pickle.dump(LogisticRegression_classifier, save_classifierLogistic)
# save_classifierLogistic.close()
#
# SGDClassifier_classifier = SklearnClassifier(SGDClassifier())
# SGDClassifier_classifier.train(training_set)
# # print("SGDClassifier_classifier accuracy percent: ", (nltk.classify.accuracy(SGDClassifier_classifier, testing_set)) * 100)
# save_classifierSGDC = open("SGDCclassifier.pickle", "wb")
# pickle.dump(SGDClassifier_classifier, save_classifierSGDC)
# save_classifierSGDC.close()
#
# # SVC_classifier = SklearnClassifier(SVC())
# # SVC_classifier.train(training_set)
# # print("SVC_classifier accuracy percent: ", (nltk.classify.accuracy(SVC_classifier, testing_set)) * 100)
#
#
# LinearSVC_classifier = SklearnClassifier(LinearSVC())
# LinearSVC_classifier.train(training_set)
# # print("LinearSVC_classifier accuracy percent: ", (nltk.classify.accuracy(LinearSVC_classifier, testing_set)) * 100)
# save_classifierLinearSVC = open("LinearSVCclassifier.pickle", "wb")
# pickle.dump(LinearSVC_classifier, save_classifierLinearSVC)
# save_classifierLinearSVC.close()
#
# NuSVC_classifier = SklearnClassifier(NuSVC())
# NuSVC_classifier.train(training_set)
# # print("NuSVC_classifier accuracy percent: ", (nltk.classify.accuracy(NuSVC_classifier, testing_set)) * 100)
# save_classifierNuSVC = open("NuSVCclassifier.pickle", "wb")
# pickle.dump(NuSVC_classifier, save_classifierNuSVC)
# save_classifierNuSVC.close()
