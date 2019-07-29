const Progress=require('../models/progress')

exports.get_all=(req, res)=>{
    Progress.find()
    .select()
    .exec()
    .then(results=>{
        res.json({
            status:"ok",
            code:"200.5.16",
            message:"success",
            data:results
        })
    })
    .catch(err=>{
        res.json({
            status:"bad request",
            code:"200.5.17",
            error:err
        })  
    })
}

exports.get_by_userId=(req,res)=>{
    Progress.find({"UserId":req.params.UserId})
    .select("-_id Url")
    .exec()
    .then(result=>{
        if(result<1){
             res.json({
                 status:"ok",
                 code:"200.5.18",
                 message:"no records"
             })
        }else{
            res.json({
                status:"ok",
                code:"200.5.19",
                message:"success",
                data:result
            })
        }
    })
    .catch(err=>{
        res.json({
            status:"bad request",
            code:"400.5.20",
            error:err
        })
    })
}

exports.post=(req, res)=>{
    Progress.find({"UserId":req.body.UserId})
    .exec()
    .then(match=>{
        if(match<1){
            const userData=new Progress({
                UserId:req.body.UserId,
                LessonNumber:req.body.LessonNumber,
                Url:req.body.Url
            })
            userData.save()
            .then(result=>{
                res.json({
                    status:"created",
                    code:"201.5.21",
                    message:"success",
                    data:result
                })
            })
            .catch(err=>{
                res.json({
                    status:"bad request",
                    code:"201.5.22",
                    error:err
                })
            })
        }else{
            res.json({
                status:"conflict",
                code:"409.5.23",
                message:"user already created",
                data:match
            })
        }
    })
    .catch(err=>{
        res.json({
            status:"bad request",
            code:"201.5.24",
            error:err
        })
    })
}

exports.update=(req,res)=>{
    Progress.find({"UserId":req.params.UserId})
    .then(result=>{
        if(result<1){
            res.json({
                status:"ok",
                code:"200.5.25",
                message:"not found"
            })
        }else{
               result.map(doc => {
                 doc.UserId=doc.UserId,
                 doc.LessonNumber=req.body.LessonNumber,
                 doc.Url=req.body.Url
                 doc.save()
                 .then(updates=>{
                     res.json({
                         status:"ok",
                         message:"success",
                         code:"200.5.26",
                         data:updates
                     })
                 })
                 .catch(err=>{
                    res.json({
                        status:"bad request",
                        code:"200.5.27",
                        error:err
                    }) 
                 })
               })
          
        }
    })
    .catch(err=>{
        res.json({
            status:"bad request",
            code:"400.5.28",
            error:err
        })
    })
}
    