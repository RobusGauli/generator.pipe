
class GenPipe {

    constructor(_values) {
        this._valuesOrGen = _values;
        this.__functions = [];
    }

    map(func) {
        this.__functions.push(func);
        return this;
    }

    _apply() {
        if(type(this._valuesOrGen) === 'array') {
            return (function * gen() {
                for(let i = 0; i < this._valuesOrGen.length; i++) {
                    yield this.__functions.reduce((acc, func) => 
                        func(acc), this._valuesOrGen[i])
                }
            }).bind(this);
        } else if(type(this._valuesOrGen) === 'generatorfunction') {
            return (function * gen() {
                const g = this._valuesOrGen();
                while(true) {
                    let genObj  = g.next();
                    if(genObj.value === undefined && genObj.done === true) {
                        return;
                    }
                    yield this.__functions.reduce((acc, func) => 
                        func(acc), genObj.value)
                }

            }).bind(this)
        }
        
    }

    apply() {
        return GenPipe._generatorController(this._apply()())
    }

    
}


GenPipe._generatorController = _gen => {
    
    class Controller {
        constructor(_gen) {
            this._gen = _gen;
        }

        all() {
            let _results = [];
            while (true) {
                let genObj = this._gen.next();
                if(genObj.value === undefined && genObj.done === true) {
                    break;
                }
                _results.push(genObj.value);
            }
            return _results;
        }

        get(chunkSize) {
            let _chunks = [];
            for(let i = 0; i < chunkSize; i++) {
                let genObj = this._gen.next();
                if(genObj.value && !genObj.done) {
                    _chunks.push(genObj.value);
                }
            }
            return _chunks;   
        }

       
        
    }

    return new Controller(_gen);
}


const type = obj => obj && obj.constructor.name.toLowerCase();

const GP = arg => 
    new GenPipe(arg)

module.exports = GP;