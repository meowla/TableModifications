import axios from "axios";
import { Button, Drawer , Table, message, Popconfirm, Typography  } from 'antd';
import React,{useState ,useEffect} from "react";
import {request} from "../../utils/request";
const { Paragraph } = Typography;
export const Head=() => {
    const [visible,setVisible]=useState(false);
    const [data,setData]=useState([]);
    
    useEffect(()=>{
        if(visible){
            request.post('/auth/login',{
              "email": "test@gmail.com",
              "password": "123456"
            }).then(()=>{
            request.post('/feature/get-image-feature-config',{
                imageVersion:'test1',
            })
            .then((res) =>{
                console.log(res);
                setData(res.data.data);
            });})
        }
    },[visible])
    const showDrawer = () => {
        setVisible(true);
      };
    const onClose = () => {
        setVisible(false);
    };
      
    const columns = [
        {
          title: '图片属性名称',
          dataIndex: 'featureName',
          width:300,
          render: (text,row,index)=>{
            return <Paragraph
              id={(row.id=="-1")?"JimPlays":row.id}
              editable={{
               autoSize: false,
               onChange: (newVal)=>{
                  if(newVal == "") return
                  if(row.id == "-1"){
                    request.post('/feature/add-image-feature-config',{
                      dataFormat: "",
                      defaultValue: "false",
                      featureName: newVal,
                      remark: row.remark,
                      type: "checkbox",
                      imageVersion: "test1",
                   })
                   .then(()=>{
                    request.post('/feature/get-image-feature-config',{
                      imageVersion:'test1',
                    })
                     .then((res) =>{
                        console.log(res);
                        setData(res.data.data);
                    });})
                    return
                  }
                  request.post('/feature/update-image-feature-config',{
                    dataFormat: "",
                    defaultValue: "false",
                    featureName: newVal,
                    id: row.id,
                    remark: row.remark,
                    type: "checkbox",
                    valid: true,
                    value: null,
                 })
                 .then(()=>{
                  request.post('/feature/get-image-feature-config',{
                    imageVersion:'test1',
                  })
                   .then((res) =>{
                      console.log(res);
                      setData(res.data.data);
                  });})
                }
              }}
            >
            {text}
            </Paragraph>
          }
        },
        {
          title: '备注',
          dataIndex: 'remark',
          width:400,
          render: (text,row,index)=>{
            return <Paragraph
              editable={{
               autoSize: false,
               onChange: (newVal)=>{
                  if(newVal == "") return
                  request.post('/feature/update-image-feature-config',{
                    dataFormat: "",
                    defaultValue: "false",
                    featureName: row.featureName,
                    id: row.id,
                    remark: newVal,
                    type: "checkbox",
                    valid: true,
                    value: null,
                 })
                 .then(()=>{
                  request.post('/feature/get-image-feature-config',{
                    imageVersion:'test1',
                  })
                   .then((res) =>{
                      console.log(res);
                      setData(res.data.data);
                  });})
                }
              }}
            >
            {text}
            </Paragraph>
          }
        },
        {
          title:<Button type="link" onClick={()=>{
           const da1=[{id:"-1",featureName:"",remark:""}]
           data.forEach(item=>{
             da1.push(item)
           })
           setData(da1)
           setTimeout(() => {document.getElementById('JimPlays').getElementsByClassName('ant-typography-edit')[0].click()}, 100)
 //          document.getElementById('JimPlaysFootball')?.click();
              // request.post('/feature/add-image-feature-config',{
              //   dataFormat: "",
              //   defaultValue: "false",
              //   featureName: "新建属性("+Math.ceil(Math.random()*100000)+")",
              //   imageVersion: "test1",
              //   remark: "",
              //   type: "checkbox"
              // })
              // .then(()=>{
              //    request.post('/feature/get-image-feature-config',{
              //    imageVersion:'test1',
              // })
              // .then((res) =>{
              //   console.log(res);
              //   setData(res.data.data);
              // });})
          }}>添加</Button>,
          dataIndex:'operate',
          width:100,
          render: (text,row,index)=>{
            return   <Popconfirm
            title={<div>确定删除 <span style={{color:'red'}}>{row.featureName}</span> 吗？</div>}
            onConfirm={()=>{
              request.post('/feature/delete-image-feature-config',{
                id: row.id
              }).then(()=>{
              request.post('/feature/get-image-feature-config',{
                imageVersion:'test1',
              })
              .then((res) =>{
                console.log(res);
                setData(res.data.data);
              });})
            }}
            okText="确定"
            cancelText="取消"
            >
            <a href="#">&nbsp;&nbsp;&nbsp;&nbsp;删除</a>
            </Popconfirm>
          }
        }
    ];

    return<>
    <Button type="primary" onClick={showDrawer}>图片属性设置</Button>
    <Drawer title="图片属性设置 Image Feature Setting" placement="left" onClose={onClose} visible={visible} width={800}>
        <Table dataSource={data} columns={columns} pagination={false} />
    </Drawer>
    </>
};

export default Head;