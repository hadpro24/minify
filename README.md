# minify

## Authorization Server

```bash
python3 -m venv env && source env/bin/activate
cd iam && git checkout v1

pip install -r requirements.txt

python manage.py runserver 0:5000
```

## Ressource Server

```bash
cd api

pip install -r requirements.txt

python manage.py runserver 0:7000
```

## Application Client

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


GDG tolk 2021 OAuth2 OIDC

## Credit
Harouna Diallo
