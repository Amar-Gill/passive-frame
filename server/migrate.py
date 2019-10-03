import peeweedbevolve
from models import *
from models.base_model import db

if __name__ == '__main__':
   db.evolve(ignore_tables={'base_model'})