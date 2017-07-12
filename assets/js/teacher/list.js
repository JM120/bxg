require(["/bxg/assets/js/config.js"],function(){
    require(['jquery','template','bootstrap','/bxg/assets/js/common.js'],function($,template){
        //功能1： 获取讲师的信息并渲染
        getTeacherList();
        //功能2：点击查看，展示讲师信息 ==>弹出模态框
        getDetailInfo();
        //功能3：点击注销启动
        stopOrStart()

        //功能1：
        function getTeacherList(){
            var options={
                type:'get',
                url:'/api/v1/teacher',
                success:function(info){
                    console.log(info);
                   if(info.code===200){
                        var html =template('tmpl-list',info);
                        $('#list').html(html);
                   }
                },
                error:function(){
                    alert('请求出错，不允许访问数据')
                }
            }
            $.ajax(options)
        }
        //功能2：
        function getDetailInfo(){
            $('#list').on('click','.preview',function(){
                //弹出模态框
                $('#teacherModal').modal();
                //请求服务器 获取讲师详情 并渲染
                //先获取请求参数
                var tcid=$(this).closest('tr').attr('tc-id');
                var options={
                    type:'get',
                    url:'/api/v1/teacher/view',
                    data:{
                        tc_id:tcid
                    },
                    success:function(info){
                        console.log(info);
                        var obj=info.result;
                        var html=`
                         <tr>
                                <th>姓名:</th>
                                <td>${obj.tc_name}</td>
                                <th>职位:</th>
                                <td colspan="3">讲师</td>
                                <td rowspan="4" width="128">
                                    <div class="avatar">
                                        <img src="${obj.tc_avatar}" alt="">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>花名:</th>
                                <td>${obj.tc_roster}</td>
                                <th>出生日期:</th>
                                <td colspan="3">${getAge(obj.tc_birthday)}</td>
                            </tr>
                            <tr>
                                <th>性别:</th>
                                <td>${obj.tc_gender === '0'?'男':'女'}</td>
                                <th>入职日期日期:</th>
                                <td colspan="3">${obj.tc_join_date}</td>
                            </tr>
                            <tr>
                                <th>手机号码:</th>
                                <td colspan="2">${obj.tc_cellphone}</td>
                                <th>邮箱:</th>
                                <td colspan="2">${obj.tc_email}</td>
                            </tr>
                            <tr>
                                <th>籍贯:</th>
                                <td colspan="6">${obj.tc_hometown}</td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <div class="introduce">
                                        ${obj.tc_introduce}
                                    </div>
                                </td>
                        </tr>`
                        $('#modal-list').html(html);

                    },
                    error:function(){
                        alert('请求出错了')
                    }
                }
                $.ajax(options);

            })
        }
        //功能3
        function stopOrStart(){
            $('#list').on('click','.start-stop',function(){
                //获取请求需求的参数
                var $tr= $(this).closest('tr');
                var $this=$(this);
                var tcid=$tr.attr('tc-id');
                var tcStatus=$tr.attr('tc-status');
                var options={
                    type:'post',
                    url:'/api/v1/teacher/handle',
                    data:{
                        tc_id:tcid,
                        tc_status:tcStatus
                    },
                    success:function(info){
                        console.log(info)
                        if(info.code===200){
                            //0 是启动状态 1是注销状态
                            var str=info.result.tc_status===0?'注销':'启动';
                            //把新的状态，保存到tr中，下次点击a标签的时候使用
                            $tr.attr('tc-status',info.result.tc_status)
                            $this.text(str);
                            console.log($(this))
                        }
                    },
                    error:function(){
                        alert('请求出错');
                    }

                }
                $.ajax(options);
            })
        }



        //传入出生日期，返回年龄
        function getAge(birth){
            var birthYear = new Date(birth).getFullYear()//根据参数生成对应的时间
            var nowYear = new Date().getFullYear();
            return nowYear-birthYear;
        }
        //过滤器，给模板中添加方法 固定语法 template.defaults.imports
        template.defaults.imports.getTecAge=getAge;
    })
})