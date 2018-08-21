if (!String.prototype['toCamelCase']) {
    Object.defineProperty(String.prototype, 'toCamelCase', {
      value: function (toCamelCase) {
        return this.valueOf().toLowerCase().split(' ').map(function (word)
   {
            return word.replace(word[0], word[0].toUpperCase());
          }).join(' ');
      }
    })
  }