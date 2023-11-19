const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.id = uuid.v4();
  }

  toJSON() {
    return {
      email: this.email,
      password: this.password,
      id: this.id,
    };
  }

  static async save(email, password) {
    try {
      const newUser = new User(email, password);
      const user = await User.getBd();
      user.push(newUser.toJSON());

      const filePath = path.join(__dirname, "..", "data", "fakeData.json");
      await fs.promises.writeFile(filePath, JSON.stringify(user), "utf-8");
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
      throw error; // Пробросим ошибку дальше для обработки в роуте
    }
  }

  static async getBd() {
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

module.exports = User;
