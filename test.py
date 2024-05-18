import sqlite3,json

con = sqlite3.connect("Conteudos.db")
cur = con.cursor()
res = cur.execute("SELECT * FROM test")

dados = json.loads(res.fetchall())

print(dados)