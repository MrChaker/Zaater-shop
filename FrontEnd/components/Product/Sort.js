import { Query } from 'mongoose';
import {Product} from '../../../BackEnd/models/product'
class Sorter{
    Sort(){}
}

export class MongoSorter extends Sorter{
    constructor(  sortBy, direction = 1){
        this.sortBy = sortBy;
        this.direction = direction
    }

    Sort(){
        console.log(this.direction)
        return Product.find().sort({ sortBy : this.direction});
    }
}
export class ArraySorter extends Sorter{
    constructor( array ){
        this.array = array
    }
}
export class NumberSort extends ArraySorter{
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
export class Reverse extends ArraySorter{
    constructor(array){
        super(array)
    }
    Sort(){
        return this.array.reverse()
        }
}
