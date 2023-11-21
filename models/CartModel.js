const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

class Card {
  constructor(titel, description, src) {
    (this.titel = titel),
      (this.src = src),
      (this.description = description),
      (this.id = uuid.v4());
  }

  toJSON() {
    return {
      titel: this.titel,
      src: this.src,
      description: this.description,
      id: this.id,
    };
  }

  static async save(titel, description, src) {
    try {
      const db = await Card.getDB();
      const newCard = new Card(titel, description, src);
      db.push(newCard.toJSON());

      const pathDb = path.join(__dirname, "..", "data", "fakeData.json");

      // Переписываем функцию writeFile с использованием промисов
      const writeFileAsync = (filePath, data) => {
        return new Promise((resolve, reject) => {
          fs.writeFile(filePath, data, "utf-8", (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      };

      await writeFileAsync(pathDb, JSON.stringify(db));
    } catch (err) {
      console.error("error");
      throw err; // Бросаем ошибку, чтобы ее можно было поймать в вызывающем коде
    }
  }

  static async updateDataInFile(updatedData) {
    return new Promise((resolve, reject) => {
      const pathDb = path.join(__dirname, "..", "data", "fakeData.json");

      fs.writeFile(pathDb, JSON.stringify(updatedData), "utf-8", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async getDB() {
    return new Promise((resolve, reject) => {
      const filePath = path.join(__dirname, "..", "data", "fakeData.json");

      fs.readFile(filePath, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          try {
            const data = JSON.parse(content);
            resolve(Array.isArray(data) ? data : []); // Убеждаемся, что возвращается массив
          } catch (parseError) {
            reject(
              new Error(`Ошибка при парсинге JSON: ${parseError.message}`)
            );
          }
        }
      });
    });
  }
}

module.exports = Card;
