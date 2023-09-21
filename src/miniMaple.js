class MiniMaple{
    diff(text_of_function, text_of_variable){
        const P = new Polynom(text_of_function)
        const V = new Variable(text_of_variable)
        if(!P.IsPolynom ||!V.IsVariable){
            return 'Error'
        }
        
        const DiffP = P.diff(V)
        if(!DiffP.IsPolynom){
            return 'Error'
        }

        return DiffP.toText()
    }
}
export {MiniMaple} 

class Polynom{
    constructor(text_of_function) {
        if (text_of_function === ''){
            this._IsPolynom = false
            return
        }
        this._Arr = []

        text_of_function = text_of_function.toLowerCase()
        text_of_function = text_of_function.replace(/\^-/g, '&')
        text_of_function = text_of_function.replace(/ /g, '')

        if(text_of_function.includes('--')||text_of_function.includes('++')||text_of_function.includes('-+')||text_of_function.includes('+-')){
            this._IsPolynom = false
            return
        }

        text_of_function = text_of_function.replace(/-/g, ' - ')
        text_of_function = text_of_function.replace(/\+/g, ' + ')
        text_of_function = text_of_function.replace(/&/g, '^-')

        let SplArr = text_of_function.split(' ')      
        if ((SplArr[0] !== '-')&&(SplArr[0] !== '+')){
            SplArr.unshift('+')
        }

        let M = []
        for (let i = 0; i < SplArr.length; i+=2) {
            const T = new ItemPolynom(SplArr[i+1],SplArr[i])
            M.push(T)
        }
        this._Arr = M
        this._IsPolynom = true
    }
    get IsPolynom() {
        return this._IsPolynom;
    }
    toText(){
        
        let text = ''
        if(this._Arr[0].Sign === '-'){
            text+='- '
        }
        text+=this._Arr[0].Text
        for (let i = 1; i < this._Arr.length; i++){
            text+=' '+this._Arr[i].Sign+' '+this._Arr[i].Text
        }
        return text
    }
    diff(variable){
        let M = []
        for (let i = 0; i < this._Arr.length; i++){
            let ip = this._Arr[i].diff(variable)
            if(ip === 'Error'){
                return new Polynom('')
            }
            if(ip.Text !== '0'){
                M.push(ip)
            }
        }
        if(M.length === 0){
            M.push(new ItemPolynom('0','+'))
        }
        let P = new Polynom('')
        P._IsPolynom = true
        P._Arr = M
        return P
    }
}

class ItemPolynom{
    constructor(text,sign) {
        this._Text = text
        this._Sign = sign
    }
    get Text() {
        return this._Text;
    }
    get Sign() {
        return this._Sign; 
    }
    diff(variable){
        if(!this._Text.includes(variable.Variable)){
            return new ItemPolynom('0','+')
        }

        let x = '*'+variable.Variable+'*'
        if(this._Text.includes(x)){
            let t = this._Text.replace(x, '*')
            return new ItemPolynom(t,this._Sign)
        }

        let z = variable.Variable+'^'
        if(this._Text.includes(z)){
            return this.step_diff(variable)
        }

        let q1 = '*'+variable.Variable
        if(this._Text.includes(q1)){
            let t = this._Text.replace(q1, '')
            return new ItemPolynom(t,this._Sign)
        }
        let q2 = variable.Variable+'*'
        if(this._Text.includes(q2)){
            let t = this._Text.replace(q2, '')
            return new ItemPolynom(t,this._Sign)
        }
        if(this._Text === variable.Variable){
            return new ItemPolynom('1',this._Sign)
        }

        return 'Error'
    }

    step_diff(variable){
        let A = this._Text.split('*')
        let k = 1
        let b = true
        let ii = 0
        while (b){       
            let z = variable.Variable+'^'
            if(A[ii].includes(z)){
                let AA = A[ii].split('^')
                k = Number(AA[1])
                let h = variable.Variable+'^'+k
                if( A[ii] !== h){
                    return 'Error'
                }
                if(k === 2){
                    A[ii] = variable.Variable
                }else{
                    A[ii] = variable.Variable+'^'+(k-1)
                }
                b = false
            }
            ii++
        }
        let s = this._Sign
        if(k<0){
            k = -k
            if(s === '+'){
                s = '-'
            }else{
                s = '+'
            }
        }

        let w = Number(A[0])

        if(!Number.isNaN(w)){
            A[0] = ''+(w*k)
        }else{
            A.unshift(''+k)
        }
        let text=A[0]
        for (let i = 1; i < A.length; i++){
            text+='*'+A[i]
        }
        return new ItemPolynom(text,s)
    }
} 

class Variable{
    constructor(text_of_variable) {
        text_of_variable = text_of_variable.toLowerCase()
        this._IsVariable = (text_of_variable.length === 1)&&(text_of_variable.match(/[a-z]/i))
        this._Variable = text_of_variable
    }
    get IsVariable() {
        return this._IsVariable;
    }
    get Variable() {
        return this._Variable; 
    }
} 

