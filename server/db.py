import psycopg2

class Database:
    def __init__(self):
        self.conn = psycopg2.connect(
            "postgres://gabe:QvA1V8Y9G5HFgQZuWNJhzEgol7qbflAY@dpg-cohv5f5jm4es739frd00-a.oregon-postgres.render.com/notesdb_04ow"
        )
        self.cur = self.conn.cursor()
        self.setup_database()

    def setup_database(self):
        self.create_table(
            "users",
            """
            id SERIAL PRIMARY KEY,
            username TEXT NOT NULL
            """
        )
        self.create_table(
            "notes",
            """
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            imgname TEXT NOT NULL,
            content TEXT NOT NULL,
            latitude DOUBLE PRECISION,
            longitude DOUBLE PRECISION,
            FOREIGN KEY (user_id) REFERENCES users (id)
            """
        )

    def create_table(self, table_name, columns):
        self.cur.execute(f"CREATE TABLE IF NOT EXISTS {table_name} ({columns});")
        self.conn.commit()

    def insert(self, sql, params):
        self.cur.execute(sql, params)
        self.conn.commit()

    def query(self, sql, params=None):
        self.cur.execute(sql, params if params else ())
        colnames = [desc[0] for desc in self.cur.description]
        return [dict(zip(colnames, row)) for row in self.cur.fetchall()]
    
    def delete_all(self, table_name):
        self.cur.execute(f"DELETE FROM {table_name};")
        self.conn.commit()

db = Database()
