import nltk
import random
from nltk.classify.scikitlearn import SklearnClassifier
import pickle
from sklearn.naive_bayes import MultinomialNB, GaussianNB, BernoulliNB
from sklearn.linear_model import LogisticRegression, SGDClassifier
from sklearn.svm import SVC, LinearSVC, NuSVC
from nltk.classify import ClassifierI
from statistics import mode
from nltk.tokenize import word_tokenize
from nltk.tokenize import WordPunctTokenizer
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

short_pos = open("positive.txt", "r").read()
short_neg = open("negative.txt", "r").read()

all_words = []
documents = []

#j is adjective, r is adverb, v is verb
allowed_word_types = ["J", "V", "R"]

def update_stopwords(stopwords):
    do_no_remove_these_sw = ['not', 'no', 'can','has','have','had','must','shan','do', 'should','was','were','won',
                             'are','cannot','does','ain', 'could', 'did', 'is', 'might', 'need', 'would']
    return [word for word in stopwords if word not in do_no_remove_these_sw]


def remove_stopwords(sentences_list, updated_stopwords):
    filtered_sentence = []
    for sentence in sentences_list:
        filtered_sentence.append([w for w in sentence if not w in updated_stopwords])
    return filtered_sentence




for p in short_pos.split('\n'):
    documents.append( (p, "pos") )

    # stopwords = set(nltk.corpus.stopwords.words('english'))
    # updated_stopwords = update_stopwords(stopwords)

    words = word_tokenize(p)

    # words2 = remove_stopwords(words, updated_stopwords)

    pos = nltk.pos_tag(words)
    for w in pos:
        if w[1][0] in allowed_word_types and len(w[0]) >= 3:
            all_words.append(w[0].lower())


for p in short_neg.split('\n'):
    documents.append( (p, "neg") )

    # stopwords = set(nltk.corpus.stopwords.words('english'))
    # updated_stopwords = update_stopwords(stopwords)

    words = word_tokenize(p)

    # words2 = remove_stopwords(words, updated_stopwords)

    neg = nltk.pos_tag(words)
    for w in neg:
        if w[1][0] in allowed_word_types and len(w[0]) >= 3:
            all_words.append(w[0].lower())

save_documents = open("documents.pickle", "wb")
pickle.dump(documents, save_documents)
save_documents.close()


# convert to an nltk frequency distribution
all_words = nltk.FreqDist(all_words)
# print(all_words.most_common(40))

# we limit
word_features = list(all_words.keys())[:5000]  # keys, nu ne intereseaza valorile

save_word_features = open("word_features.pickle", "wb")
pickle.dump(word_features, save_word_features)
save_word_features.close()


# function that find those features within the document that we're using
def find_features(document):
    # stopwords = set(nltk.corpus.stopwords.words('english'))
    # updated_stopwords = update_stopwords(stopwords)
    words = word_tokenize(document)
    # words = WordPunctTokenizer().tokenize(document)

    # words = remove_stopwords(words, updated_stopwords)


    features = {}  # empty dictionary
    for w in word_features:
        features[w] = (w in words)  # true/false. Cheia este w, adica cuvantul din cele 3000 de cuvinte. Valoarea:true/false

    return features


# print((find_features(movie_reviews.words('neg/cv000_29416.txt')))) #cuvintele negative care se gasesc in cele 3000 cuvinte au true. cautam cuvintele practic in neg/cv...
featuresets = [(find_features(rev), category) for (rev, category) in documents]


# random.shuffle(featuresets)
print(len(featuresets))


training_set = featuresets[:10000]
testing_set = featuresets[10000:]



classifier = nltk.NaiveBayesClassifier.train(training_set)
print("Original Naive Bayes Algo accuracy percent: ", (nltk.classify.accuracy(classifier, testing_set)) * 100)
classifier.show_most_informative_features(15)
save_classifier = open("originalclassifier.pickle", "wb")
pickle.dump(classifier, save_classifier)
save_classifier.close()


#SCIKIT-LEARN INCORPORATION

#MultinomialNB
MNB_classifier = SklearnClassifier(MultinomialNB())
#now we ve got a classifier and now we can do the exact same thing as we did before

#we want to train the classifier
MNB_classifier.train(training_set)
print("MNB_classifier accuracy percent: ", (nltk.classify.accuracy(MNB_classifier, testing_set)) * 100)
save_classifierMNB = open("MNBclassifier.pickle", "wb")
pickle.dump(MNB_classifier, save_classifierMNB)
save_classifierMNB.close()

#GaussianNB
# GaussianNB_classifier = SklearnClassifier(GaussianNB())
# GaussianNB_classifier.train(training_set)
# print("GaussianNB_classifier accuracy percent: ", (nltk.classify.accuracy(GaussianNB_classifier, testing_set)) * 100)


#BernoulliNB
BernoulliNB_classifier = SklearnClassifier(BernoulliNB())
BernoulliNB_classifier.train(training_set)
print("BernoulliNB_classifier accuracy percent: ", (nltk.classify.accuracy(BernoulliNB_classifier, testing_set)) * 100)
save_classifierBernoulli = open("Bernoulliclassifier.pickle", "wb")
pickle.dump(BernoulliNB_classifier, save_classifierBernoulli)
save_classifierBernoulli.close()

#   LogisticRegression, SGDClassifier
#   SVC, LinearSVC, NuSVC


LogisticRegression_classifier = SklearnClassifier(LogisticRegression())
LogisticRegression_classifier.train(training_set)
print("LogisticRegression_classifier accuracy percent: ", (nltk.classify.accuracy(LogisticRegression_classifier, testing_set)) * 100)
save_classifierLogistic = open("Logisticclassifier.pickle", "wb")
pickle.dump(LogisticRegression_classifier, save_classifierLogistic)
save_classifierLogistic.close()

SGDClassifier_classifier = SklearnClassifier(SGDClassifier())
SGDClassifier_classifier.train(training_set)
print("SGDClassifier_classifier accuracy percent: ", (nltk.classify.accuracy(SGDClassifier_classifier, testing_set)) * 100)
save_classifierSGDC = open("SGDCclassifier.pickle", "wb")
pickle.dump(SGDClassifier_classifier, save_classifierSGDC)
save_classifierSGDC.close()

# SVC_classifier = SklearnClassifier(SVC())
# SVC_classifier.train(training_set)
# print("SVC_classifier accuracy percent: ", (nltk.classify.accuracy(SVC_classifier, testing_set)) * 100)
# save_classifierSVC = open("SVCclassifier.pickle", "wb")
# pickle.dump(SVC_classifier, save_classifierSVC)
# save_classifierSVC.close()



LinearSVC_classifier = SklearnClassifier(LinearSVC())
LinearSVC_classifier.train(training_set)
print("LinearSVC_classifier accuracy percent: ", (nltk.classify.accuracy(LinearSVC_classifier, testing_set)) * 100)
save_classifierLinearSVC = open("LinearSVCclassifier.pickle", "wb")
pickle.dump(LinearSVC_classifier, save_classifierLinearSVC)
save_classifierLinearSVC.close()

NuSVC_classifier = SklearnClassifier(NuSVC())
NuSVC_classifier.train(training_set)
print("NuSVC_classifier accuracy percent: ", (nltk.classify.accuracy(NuSVC_classifier, testing_set)) * 100)
save_classifierNuSVC = open("NuSVCclassifier.pickle", "wb")
pickle.dump(NuSVC_classifier, save_classifierNuSVC)
save_classifierNuSVC.close()

# DecisionTree_classifier = SklearnClassifier(DecisionTreeClassifier())
# DecisionTree_classifier.train(training_set)
# print("DecisionTree_classifier accuracy percent: ", (nltk.classify.accuracy(DecisionTree_classifier, testing_set)) * 100)
# save_classifierDecisionTree = open("DecisionTree_classifier.pickle", "wb")
# pickle.dump(DecisionTree_classifier, save_classifierDecisionTree)
# save_classifierDecisionTree.close()

# RandomForest_classifier = SklearnClassifier(RandomForestClassifier())
# RandomForest_classifier.train(training_set)
# print("RandomForest_classifier accuracy percent: ", (nltk.classify.accuracy(RandomForest_classifier, testing_set)) * 100)
# save_classifierRandomForest = open("RandomForest_classifier.pickle", "wb")
# pickle.dump(RandomForest_classifier, save_classifierRandomForest)
# save_classifierRandomForest.close()


# COMBINING ALGOS WITH A VOTE

class VotesClassifier(ClassifierI):
    def __init__(self, *classifiers):
        self.classifiers = classifiers

    def classify(self, features):
        votes=[]
        for c in self.classifiers:
            v = c.classify(features)
            votes.append(v)
        return mode(votes)

    def confidence(self, features):
        votes = []
        for c in self.classifiers:
            v = c.classify(features)
            votes.append(v)
        choice_votes = votes.count(mode(votes))
        conf = choice_votes / len(votes)
        return conf




voted_classifier = VotesClassifier(classifier,
                                   MNB_classifier,
                                   BernoulliNB_classifier,
                                   LogisticRegression_classifier,
                                   SGDClassifier_classifier,
                                   LinearSVC_classifier,
                                   NuSVC_classifier,
                                  )

print("voted_classifier accuracy percent: ", (nltk.classify.accuracy(voted_classifier, testing_set)) * 100)

# print("Classification: ", voted_classifier.classify(testing_set[0][0]), "Confidence: ", voted_classifier.confidence(testing_set[0][0]) * 100)
# print("Classification: ", voted_classifier.classify(testing_set[1][0]), "Confidence: ", voted_classifier.confidence(testing_set[1][0]) * 100)
# print("Classification: ", voted_classifier.classify(testing_set[2][0]), "Confidence: ", voted_classifier.confidence(testing_set[2][0]) * 100)
# print("Classification: ", voted_classifier.classify(testing_set[3][0]), "Confidence: ", voted_classifier.confidence(testing_set[3][0]) * 100)
# print("Classification: ", voted_classifier.classify(testing_set[4][0]), "Confidence: ", voted_classifier.confidence(testing_set[4][0]) * 100)
# print("Classification: ", voted_classifier.classify(testing_set[5][0]), "Confidence: ", voted_classifier.confidence(testing_set[5][0]) * 100)


def sentiment(text):
    feats = find_features(text)

    return voted_classifier.classify(feats)