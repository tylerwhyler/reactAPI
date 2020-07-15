from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.sqlite')

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Journal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(32))
    content = db.Column(db.String(144))

    def __init__(self, title, content):
        self.title = title
        self.content = content

class JournalSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'content')

journal_schema = JournalSchema()
journals_schema = JournalSchema(many=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/entry', methods = ['POST'])
def create_journal():
    title = request.json['title']
    content = request.json['content']

    new_journal = Journal(title, content)

    db.session.add(new_journal)
    db.session.commit()

    journal = journal.query.get(new_journal.id)

    return journal_schema.jsonify(journal)

@app.route("/journal/<id>", methods=["GET"])
def get_journal(id):
    journal = Journal.query.get(id)
    return journal_schema.jsonify(journal)

@app.route("/journals", methods=["GET"])
def get_journals():
    all_journals = Journal.query.all()
    result = journals_schema.dump(all_journals)
    return jsonify(result)

@app.route("/journal/<id>", methods=["DELETE"])
def journal_delete(id):
    journal = Journal.query.get(id)
    db.session.delete(journal)
    db.session.commit()

    return journal_schema.jsonify(journal)

if __name__ == '__main__':
    app.run(debug=True)