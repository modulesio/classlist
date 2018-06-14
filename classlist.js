const trim = require('trim');

class ClassList extends Array {
  constructor(className, onchange) {
    super();

    this.reset(className);
    this.onchange = onchange;
  }
  
  item(k) {
    const v = this[k];
    return v !== undefined ? v : null;
  }
  
  reset(className) {
    var classes = trim(className).split(/\s+/), i;
    this.length = 0;

    for (i = 0; i < classes.length; i += 1) {
      if (classes[i]) {
        this.push(classes[i]);
      }
    }
  }
  
  add() {
    var name, i;

    for (i = 0; i < arguments.length; i += 1) {
      name = '' + arguments[i];

      if (this.indexOf(name) !== -1) {
        continue;
      }

      this.push(name);
    }

    this.onchange(this.toString());

    return this;
  }
  
  remove() {
    var index,
        name,
        i,
        j;

    for (i = 0; i < arguments.length; i += 1) {
      name = arguments[i] + '';
      index = this.indexOf(name);

      if (index < 0) {
        continue;
      }
      
      for (j = index; j < this.length - 1; j++) {
        this[index] = this[index + 1];
      }
      this.length--;
    }

    this.onchange(this.toString());

    return this;
  }
  
  contains(name) {
    name += '';
    return this.indexOf(name) !== -1;
  }
  
  toggle(name, force) {
    name += '';

    if (force === true) {
      return this.add(name);
    }
    if (force === false) {
      return this.remove(name);
    }

    return this[this.contains(name) ? 'remove' : 'add'](name);
  }
  
  toString() {
    return this.join(' ');
  }
}

module.exports = ClassList;
