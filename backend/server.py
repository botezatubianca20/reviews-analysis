from flask import Flask, request, url_for, redirect
from flask_restful import Resource, Api
import pymysql as MySQLdb

app = Flask(__name__)
api = Api(app)

class Employees(Resource):
    def get(self):
        return {'movies': [{'id':1, 'name':'50 Shades of Grey'},{'id':2, 'name':'50 Shades Darker'}]} 

api.add_resource(Employees, '/movies') # Route_1

if __name__ == '__main__':
     app.run(port=5002)