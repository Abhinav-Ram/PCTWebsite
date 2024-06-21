from flask import Flask, jsonify, render_template, url_for
import json

app = Flask(__name__)

def load_json(filename):
    with open(f'json/{filename}', 'r') as file:
        data = json.load(file)
        return data

@app.template_global()
def summary(content, length=100):
    if len(content) <= length:
        return content
    return content[:length] + '...'

@app.context_processor
def inject_context_data():
    return {'contact_url': 'https://forms.gle/FZHA8tXyg3uN8BxT6'}

@app.route('/get_image_source/<card_id>')
def get_image_source(card_id):
    # Logic to generate the image source based on the card ID
    image_source = url_for('static', filename=f'media/cards/{card_id}.png')
    print(image_source)
    return jsonify({'imageSource': image_source})

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/aboutus/')
def about():
    data = load_json('about.json')['about']
    return render_template('aboutus.html', data=data)

@app.route('/<category>/<subcategory>/')
def display_cards(category, subcategory):
    data = load_json(f'{category}.json')
    page_data = data.get(category, {}).get(subcategory, [])
    return render_template('cards.html', pagetitle=f"{category.capitalize()} {subcategory.capitalize()}", data=page_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
