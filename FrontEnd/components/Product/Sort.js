export class Sorter{
    constructor(array ){
        this.array = array;
    }
    Sort(){}
}
export class NumberSort extends Sorter{
    constructor(array, sortBy){
        super(array);
        this.sortBy = sortBy;
    }
    Sort(){
        this.array.sort((a, b)=>{
            return a[this.sortBy] - b[this.sortBy]
        })
    }
}
export class Reverse extends Sorter{
    constructor(array){
        super(array)
    }
    Sort(){
        return this.array.reverse()
        }
}

