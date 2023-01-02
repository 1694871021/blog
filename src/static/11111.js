Comment.init({
  cmid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  uid: {
      type: Sequelize.STRING,
  },
  uname: Sequelize.STRING,
  ucontent: Sequelize.STRING,
  bkname: Sequelize.STRING,
  bkid: Sequelize.INTEGER,
  uavatar: {
      type: Sequelize.STRING,
  }
}, {
  sequelize,
  tableName: 'comment'
})

router.post('/write', new Auth().m, async ctx => {
  const v = await new BookIdValidator().validate(ctx)
  const comment = new Comment()
  ctx.body = await comment.addBookComment(v.get('body.commentInfo'))
})

// 而addBookComment方法的处理就是将用户上传的表单中的数据保存到数据库。

async addBookComment(commentInfo) {
  let mCommentInfo = JSON.parse(commentInfo)
  try {
      let comment =  await Comment.create({
          uid: mCommentInfo.userid,
          uname: mCommentInfo.username,
          ucontent: mCommentInfo.conment,
          bkname: mCommentInfo.bookname,
          bkid: mCommentInfo.bookid,
          uavatar: mCommentInfo.avatar
      })
      console.log(comment)
      if (!comment){
          throw new global.errs.NotFound('创建评论失败',-1)
      }
      return comment
    } catch (err) {
      // print the error details
      console.log(err);
    }
  
}

评论列表获取
router.get('/', new Auth().m, async ctx => {
  const v = await new BkIdValidator().validate(ctx)
  const comment = new Comment()
  ctx.body = await comment.geCommentByBookId(v.get('query.bkid'))
})

// 这里的评论列表接口也是使用了Auth中间件去检验用户是否登录。通过上面伪代码可以是通过书籍id去查询书籍的评论列表，那么geCommentByBookId的代码如下：
async geCommentByBookId(bkid) {
  const comments =await Comment.findAll({
      where: {
          bkid
      }
  })
  if (comments.length <= 0) {
      throw new global.errs.NotFound("还没有评论信息哟~", NotFound.COMMENT_EMPTY)
  }
  return comments
}
// 这里的通过书籍id查询数据库中所有的评论信息，如果有评论信息则返回评论数据，没有评论数据则返回错误的提示信息。