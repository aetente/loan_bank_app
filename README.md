# loan_bank_app

It is a kind of loan bank application, which "simulates" user experience for acquiring loan for their business.

It has 4 stages: login, fill in the client info, fill in the bank data and choosing the amount of loan user needs.

It doesn't have registration for now, you add user from database which is explained below.

The repository consists of a backend part and a frontend part. The frontend is React, the backend is Django.

# Installation instructions:

Backend

Start with:
```
pip install -r .\requirements.txt
```

Then just in case run:
```
python manage.py makemigrations
python manage.py migrate
```

After it run this to add users to the database from excel file:
```
python manage.py load_excel --path .\DB.xlsx
```

And then you should be able to run:
```
python manage.py runserver
```



Frontend:

Run:
```
npm install
```

And then:
```
npm start
```
