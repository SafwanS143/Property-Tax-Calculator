from app import create_app
from app.transfer import import_data

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
