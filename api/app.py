from flask import Flask , request , jsonify
from flask_cors import CORS, cross_origin 
from flask_pymongo import PyMongo 
from bson.objectid import ObjectId
import json
app = Flask(__name__)
# connect your mongodb after installation
app.config["MONGO_URI"]='mongodb://localhost:27017/demo1'
mongo = PyMongo(app)

cors = CORS(app)
db = mongo.db.demo1
@cross_origin()


@app.route('/',methods=["GET","POST"])
def getpost():
    if request.method == "GET":
        o =[]
        for i in db.find():
            o.append({"_ID":str(ObjectId(i["_id"])),"firstname":i["firstname"],"lastname":i["lastname"],"email":i["email"],"phonenumber":i["phonenumber"],"city":i["city"]})
        return jsonify(o)
    elif request.method == "POST":
        print(request.json)
        id = db.insert({"firstname":request.json["firstname"],"lastname":request.json["lastname"],"email":request.json["email"],"phonenumber":request.json["phonenumber"],"city":request.json["city"]})
        return jsonify(str(ObjectId(id)))
@app.route('/<id>',methods=["DELETE","PUT"])
def deleteput(id):
    if request.method == "DELETE":
        db.delete_one({"_id":ObjectId(id)})
        return jsonify({"message":"deleted"})
    elif request.method == "PUT":
        db.update({"_id":ObjectId(id)},{"$set":{
            "firstname":request.json["firstname"],
            "lastname":request.json["lastname"],
            "email":request.json["email"],
            "phonenumber":request.json["phonenumber"],
            "city":request.json["city"],
        }})
        return jsonify({"message":"updated"})
@app.route('/getone/<id>',methods=["GET"])
def getone(id):
    res = db.find_one({"_id":ObjectId(id)})
    print(res)
    return {"_ID":str(ObjectId(res["_id"])),"firstname":res["firstname"],"lastname":res["lastname"],"email":res["email"],"phonenumber":res["phonenumber"],"city":res["city"]}


