import os
import xlrd
from django.core.management import BaseCommand
from btb.models import User
from btb.serializers import UserSerializer


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('--path', type=str)

    def handle(self, *args, **kwargs):
        first_row = 1
        path = kwargs['path']

        if os.path.isfile(path):
            book = xlrd.open_workbook(path)
            sheet = book.sheet_by_index(0)
            nr_rows = sheet.nrows
            for row in range(first_row, nr_rows):
                row_value_list = []
                sheet_row = sheet.row(row)
                user = {}
                user["first_name"] = sheet_row[0].value
                user["last_name"] = sheet_row[1].value
                user["TZ"] = str(int(sheet_row[2].value))
                user["email"] = sheet_row[3].value
                user["password"] = str(int(sheet_row[4].value))
                print(user)
                User.objects.create_user(
                    username=user["TZ"],
                    first_name=user["first_name"],
                    last_name=user["last_name"],
                    TZ=user["TZ"],
                    email=user["email"],
                    password=user["password"],
                )
