from flask import *
import sqlite3,json

app = Flask(__name__)

def PadraoDados():
    con = sqlite3.connect("Conteudos.db")
    cur = con.cursor()

@app.route("/",methods=["GET","POST"])
def Home():
    return render_template("index.html")

@app.route("/Comprar",methods=["GET","POST"])
def Comprar():
    con = sqlite3.connect("Conteudos.db")
    cur = con.cursor()
    cur.execute("DROP TABLE IF EXISTS Carrinho")
    con.commit()
    return render_template("index.html")


@app.route("/DROPALL",methods=["GET","POST"])
def DROP():
    con = sqlite3.connect("Conteudos.db")
    cur = con.cursor()
    cur.execute("DROP TABLE IF EXISTS Loja_Itens")
    cur.execute("DROP TABLE IF EXISTS Carrinho")
    con.commit()
    return render_template("index.html")

@app.route("/Carrinho",methods=["GET","POST"])
def Carrinho():
    return render_template("Carrinho.html")


@app.route("/Click",methods=["GET","POST"])
def Click():
    data = request.get_json()
    titulo = data["titulo"]
    preco = data["preco"]
    Img = data["Img"]
    ativo = data["ativo"]
    Data = data["Data"]
    description = data["description"]
    con = sqlite3.connect("Conteudos.db")
    cur = con.cursor()
    cur.execute(f"""CREATE TABLE IF NOT EXISTS Loja_Itens(id INTEGER PRIMARY key AUTOINCREMENT,
                nome TEXT,
                preço REAL,
                foto BLOB,
                Data TEXT,
                ativo BOOLEAN,
                description TEXT
                )
                """)
    cur.execute(f"""
                INSERT INTO Loja_Itens values
                (NULL,"{titulo}","{preco}","{Img}","{Data}","{ativo}","{description}")
                """)
    con.commit()
    return "",201

@app.route("/Body",methods=["POST","GET"])
def Bodys():
    try:
        db = sqlite3.connect("Conteudos.db")
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        cursor.execute('SELECT * FROM Loja_Itens')
        dados = cursor.fetchall()
        return jsonify([dict(row) for row in dados])
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@app.route("/Receber",methods=["GET","POST"])
def Receber():
    try:
        db = sqlite3.connect("Conteudos.db")
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        cursor.execute('SELECT * FROM Carrinho')
        dados = cursor.fetchall()
        return jsonify([dict(row) for row in dados])
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@app.route("/Remove",methods=["POST","GET"])
def Remove():
    data = request.get_json()
    con = sqlite3.connect("Conteudos.db")
    cursor = con.cursor()
    id = str(data["value"])
    cursor.execute(f"DELETE FROM Loja_Itens WHERE id={id}")
    con.commit()
    return "",201

@app.route("/AdicionarCarrinho",methods=["POST","GET"])
def AdicionarCarrinho():
    data = request.get_json()
    titulo = data["titulo"]
    preco = data["preco"]
    Img = data["Img"]
    con = sqlite3.connect("Conteudos.db")
    cur = con.cursor()
    cur.execute("""CREATE TABLE IF NOT EXISTS Carrinho(id INTEGER PRIMARY key AUTOINCREMENT,
            nome TEXT,
            preço REAL,
            foto BLOB
            )""")
    cur.execute(f"""
                INSERT INTO Carrinho values
                (NULL,"{titulo}","{preco}","{Img}")
                """)
    con.commit()
    return "",201

@app.route("/Editar",methods=["POST","GET"])
def Edit():
    data = request.get_json()
    titulo = data["titulo"]
    preco = data["preco"]
    Img = data["Img"]
    ativo = data["ativo"]
    Id = str(data["Ids"])
    description = data["description"]
    con = sqlite3.connect("Conteudos.db")
    cursor = con.cursor()
    cursor.execute(f"""UPDATE Loja_Itens SET 
                   nome="{titulo}",
                   preço="{preco}",
                   foto="{Img}",
                   ativo="{ativo}",
                   description="{description}"
                   WHERE id={Id}
                """)
    con.commit()
    return "",201

if __name__ == "__main__":
    app.run(debug=True)