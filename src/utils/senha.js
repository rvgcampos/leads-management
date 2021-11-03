function hasSpecialCaractere(password) {
      const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      let digits_bool = false;
      const LOCASE_CHARACTERS = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ];
      let locase_bool = false;

      const UPCASE_CHARACTERS = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "M",
        "N",
        "O",
        "p",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      let upcase_bool = false;

      const SYMBOLS = [
        "@",
        "#",
        "$",
        "%",
        "=",
        ":",
        "?",
        ".",
        "/",
        "|",
        "~",
        ">",
        "*",
        "(",
        ")",
        "<",
      ];
      let symbols_bool = false;

      DIGITS.forEach((item) => {
        if (password.indexOf(item) > -1) {
          digits_bool = true;
        }
      });

      LOCASE_CHARACTERS.forEach((item) => {
        if (password.indexOf(item) > -1) {
          locase_bool = true;
        }
      });

      UPCASE_CHARACTERS.forEach((item) => {
        if (password.indexOf(item) > -1) {
          upcase_bool = true;
        }
      });

      SYMBOLS.forEach((item) => {
        if (password.indexOf(item) > -1) {
          symbols_bool = true;
        }
      });

      return digits_bool && locase_bool && upcase_bool && symbols_bool;
}
    
export default hasSpecialCaractere;