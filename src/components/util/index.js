/**
 *	[string] 需要验证的字符串
 *	[type] 需要验证的类型
 *  return [boolean]
 **/

// export function verify (str, type) {
// 	var rule = {
//         notEmpty: /^\s+$/g,                                                     // 不为空
//         email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+$/,            // 邮箱
//         mobile: /^1[3|4|5|7|8]\d{9}$/,                                          // 移动手机号
//         qq: /^\d{5,11}$/,                                                       // qq号
//         IDCard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/, // 身份证
//         money: /(^[1-9]|^[1-9]\d+|^0)(\.\d{1,2})?$/ // 金钱
//     }
//     return rule[type].test(util.trim(str, 'G'))
// }
import { Message, Loading } from 'element-ui'

const util = { // 简单的工具
	trim (str, _global) { // 去除字符串中的空格 第二个参数为 'g'或'G' 时 取出字符串中所有空格
        let result
        result = str.replace(/(^\s+)|(\s+$)/g, '')
        if (_global.toLowerCase() == 'g') {
            result = result.replace(/\s/g, '')
        }
        return result
	},
    verify (str, type) {
        let rule = {
            notEmpty: /^\s+$/g,                                                     // 不为空
            email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+$/,            // 邮箱
            mobile: /^1[3|4|5|7|8]\d{9}$/,                                          // 移动手机号
            qq: /^\d{5,11}$/,                                                       // qq号
            IDCard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/, // 身份证
            money: /(^[1-9]|^[1-9]\d+|^0)(\.\d{1,2})?$/, // 金钱
            intNum: /^[1-9][0-9]*$/, // 正整数
            negativeNum: /^-[1-9][0-9]*$/, // 负整数
            // zoreIntNum: /^[1-9][0-9]*$|^0$/ // 
        }
        return rule[type].test(util.trim(str, 'G'))
    },
    upload_oss_img (obj, dirname) { // 阿里云 oss图片直传
        //
        console.log(obj, dirname)
        var imageType = ['image/jpeg','image/png','image/jpeg','image/gif'];
        var uploader = new plupload.Uploader({
            runtimes : 'html5,html4',
            browse_button : obj.browse_button || '',  //选择图片按钮 ID
            multi_selection: obj.multi_selection || true, //是否可多选图片
            flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
            silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
            filters: obj.filters || {
                mime_types : [ //只允许上传图片和zip文件
                    { title : "Image files", extensions : "jpg,png,jpeg,gif" }, 
                ],
                max_file_size : '10mb', //这是文件的最大上传大小，得跟IIS结合使用
            },
            url : host,
            loadinginstace: null,
            init: {
                PostInit: function() { //post 初始化
                    obj.init && obj.init.PostInit && obj.init.PostInit()
                },
                FilesAdded: function(up, files) { //添加文件
                    var previewImageFiles = []
                    get_dirname(dirname); //文件名称
                    for(var i=0;i<files.length;i++){
                        if(imageType.indexOf(files[i].type) == -1){
                            Message.error({
                                message: '图片格式不正确'
                            })
                            return false;
                        }
                    }

                    // obj.previewImage 为true 有预览图片
                    obj.previewImage && plupload.each(files,
                        function(file) {
                            previewImage(file,
                                function(obj) {
                                    document.getElementById(obj.id) && document.getElementById(obj.id).setAttribute('src', obj.name)
                                }
                            )
                        }
                    )

                    // 生成预览图片预览
                    function previewImage(file, callback) { //file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
                        if (!file || !/image\//.test(file.type)) return;
                        if (file.type == 'image/gif') { //gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
                            var fr = new mOxie.FileReader();
                            fr.onload = function() {
                                callback(fr.result);
                                fr.destroy();
                                fr = null;
                            }
                            fr.readAsDataURL(file.getSource());
                        } else {
                            var preloader = new mOxie.Image();
                            preloader.onload = function() {
                                preloader.downsize(300, 300); //先压缩一下要预览的图片,宽300，高300
                                var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
                                callback && callback({id: file.id,name: imgsrc}); //callback传入的参数为预览图片的url
                                preloader.destroy();
                                preloader = null;
                            };
                            preloader.load(file.getSource());
                        }
                    }

                    obj.init && obj.init.FilesAdded && obj.init.FilesAdded(up, files)

                    set_upload_param(uploader, '', false);
                    return false;
                },
                BeforeUpload: function(up, file) { //上传前
                    check_object_radio();
                    set_upload_param(up, file.name, true);

                    if (obj.browse_button && document.getElementById(obj.browse_button)) {
                        console.log(document.getElementById(obj.browse_button))
                        this.loadinginstace = Loading.service({ target: document.getElementById(obj.browse_button)})
                    } 
                },
                UploadProgress: function(up, file) { //上传 进度
                    // if (file.percent)
                    obj.previewImage && obj.init && obj.init.UploadProgress && obj.init.UploadProgress(up, file)
                },
                FileUploaded: function(up, file, info) { //上传成功
                    var filename = get_uploaded_object_name(file.name),
                        imgurl = host+'/'+filename;
                    obj.init && obj.init.FileUploaded && obj.init.FileUploaded(up, file, info, imgurl)
                    
                    this.loadinginstace && this.loadinginstace.close()

                    return false;
                },
                Error: function(up, err) { //失败
                    if(err.code == -600){
                        Message.error({
                            message: '图片尺寸过大'
                        })
                        this.loadinginstace.close()
                    } else if(err.code == -601){
                        Message.error({
                            message: '图片格式错误'
                        })
                        this.loadinginstace.close()
                    } else {
                        Message.error({
                            message: '图片上传失败'
                        })
                        this.loadinginstace.close()
                    }
                }
            }
        });
        uploader.init();
    }
}

export default util
