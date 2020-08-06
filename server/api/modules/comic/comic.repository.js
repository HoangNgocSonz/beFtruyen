const mongoose = require('mongoose');

const ComicSchema = mongoose.Schema({
    name: String,
    avatar:String,
    author:[{
        type:String,
    }],
    description:String,
    category:[
        {
            type:String,
        }
    ],
    chapters:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Chapter"
    }],
    comments:[{
        user:String,
        message:String,
        dateCreated:Date,
        like:Number,
    }],
    view:{
        type:Number,
        default:0
    },
    like:{
        type:Number,
        default:0
    },
    follow:{
        type:Number,
        default:0
    },
    commentTotal:{
        type:Number,
        default:0
    },
    date:Date,
    anotherName:[
        {
            type:String,
        }
    ],
    status:{
        type:String,
        default:'đang tiến hành',
    },
    newChapter1:{
        date:Date,
        id:mongoose.Schema.Types.ObjectId,
    },
    newChapter2:{
        date:Date,
        id:mongoose.Schema.Types.ObjectId,
    },
    newChaper3:{
        date:Date,
        id:mongoose.Schema.Types.ObjectId,
    }
});

const ComicModel = mongoose.model('Comic',ComicSchema);

const find = async function (query) {
    // const limit = Number(query.limit);
    // const skip = Number(query.skip);
    // delete query.skip;
    // delete query.limit;
    // if ( limit && skip !== undefined ) {
    //   return await ComicModel.find(query).limit(limit).skip(skip);
    // } else {
    //   return await ComicModel.find(query).populate("chapters");
    // }
    return await ComicModel.find(query);
  }
  
const count = async function (query) {
    return await ComicModel.count(query);
}

const findById = async function(id){
    return await ComicModel.findById(id).populate("chapters");
}

const create = async function(data){
    const a = new ComicModel(data);
    return await a.save();
}

const update = async function(id,data){
    if(data.chapters){
        return await ComicModel.findByIdAndUpdate(id,{$addToSet:data},{new:true});
    }else if(!data.chapters){
        return await ComicModel.findByIdAndUpdate(id,{$set:data},{new:true});
    }
    else{
        throw new Error("chỉ dùng để thêm chap mới, err tại comic.repo");
    }
    
}
const  deleteOne = async function(id){
    return await ComicModel.findByIdAndDelete(id);
}

module.exports = {
    find:find,
    findById:findById,
    create:create,
    update:update,
    delete:deleteOne,
    count: count,
}