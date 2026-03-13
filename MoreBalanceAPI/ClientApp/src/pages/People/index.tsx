
import { Button, ConfigProvider, Form, Input, InputNumber, Modal, Table, theme, Typography, type TableColumnsType, type TableColumnType } from 'antd';
import styles from './styles.module.css';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { PeopleModel } from '../../Models/People';
import api from "../../api/api";
import { ToastContainer, toast } from "react-toastify";

export const People = () => {
    const [createForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [recordPerson, setRecordPerson] = useState<PeopleModel>();
    const [dataSource, setDataSource] = useState<PeopleModel[]>([]);

    async function EditPerson(values: any) {
        try {
            debugger;
            const resp = await api.put("api/person", values);
            if (resp.status == 200) {
                toast.success("Atualização realizada com sucesso!");
                editForm.resetFields();
                setIsModalEdit(false);
                fetchInitialData();
            } else {
                toast.error("Houve um erro ao cadastrar!")
            }
        } catch (error) {
            toast.error("Erro interno ao atualizar!")
        }

    }

    async function DeletePerson() {
        try {
            if (recordPerson?.id != null) {
                debugger;
                const resp = await api.delete(`api/person/${recordPerson?.id}`);
                if (resp.status == 200) {
                    toast.success("Deleção realizada com sucesso")
                    setIsModalDelete(false);
                    fetchInitialData();
                } else {
                    toast.error("Erro ao deletar item!")
                }
            } else {
                toast.info("Item para deleção não definido!");
            }
        } catch {
            toast.error("Erro interno ao deletar!")
        }
    }
    const fetchInitialData = async () => {
        try {
            debugger;
            var resp = await api.get("api/person");
            setDataSource(resp.data);

        } catch (error) {
            toast.error("Erro interno ao buscar dados!")
        }
    }
    const onFinish = async (values: any) => {
        try {
            debugger;
            const resp = await api.post("api/person", values);
            if (resp.status == 200) {
                toast.success("Pessoa cadastrada com sucesso!");
                createForm.resetFields();
                setIsModalCreate(false);
                fetchInitialData();
            } else {
                toast.error("Houve um erro ao cadastrar!")
            }
        } catch (error) {
            toast.error("Erro interno ao cadastrar!")
        }

    }


    useEffect(() => {
        editForm.setFieldsValue({ id: recordPerson?.id, age: recordPerson?.age, name: recordPerson?.name });
    }, [recordPerson])

    useEffect(() => {
        fetchInitialData();
    }, [])


    const columns: TableColumnsType<PeopleModel> = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            width: '45%'
        },
        {
            title: 'Idade',
            dataIndex: 'age',
            key: 'age',
            width: '45%'
        },
        {
            title: 'Ações',
            key: 'actions',
            width: '10%',
            render: (_, record) => (
                <div className={styles.divActions}>
                    <EditOutlined style={{ color: '#096dd9' }} onClick={() => {
                        setIsModalEdit(true);
                        setRecordPerson(record);
                    }} />
                    <DeleteOutlined style={{ color: '#ff4d4f' }} onClick={() => {
                        setIsModalDelete(true);
                        setRecordPerson(record);
                    }} />
                </div>
            ),
        },
    ];

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorBgContainer: '#1f1f1f',
                    colorBgElevated: '#1f1f1f',
                    colorBgLayout: '#141414',
                    colorPrimary: '#096dd9',
                    colorText: '#d9d9d9',
                    borderRadius: 8,
                },
                components: {
                    Table: {
                        headerBg: '#1a1a1a',
                        headerColor: '#ffffff',
                    },
                    Modal: {
                        contentBg: '#1f1f1f',
                        headerBg: '#1f1f1f',
                    },
                    Input: {
                        colorBgContainer: '#262626',
                    },
                },
            }}
        >
            <div className={styles.mainContainer}>
                <div className={styles.divRegister}>
                    <Typography.Title className={styles.titleSection}  >Pessoas</Typography.Title >
                    <Button size='large' className={styles.buttonAdd} icon={<PlusOutlined style={{ marginRight: '4px' }} />} onClick={() => setIsModalCreate(true)} > Adicionar Pessoa </Button>
                </div>

                <div className={styles.divList}>
                    <Table<PeopleModel> columns={columns} className={styles.table} dataSource={dataSource} pagination={{
                        pageSize: 7,
                        showSizeChanger: false,
                    }} />
                </div>

                <Modal
                    title="Cadastro de Pessoa"
                    footer={false}
                    open={isModalCreate}
                    onCancel={() => setIsModalCreate(false)}
                    className={styles.modalRegister}>


                    <Form onFinish={onFinish} form={createForm} layout='vertical' validateTrigger='onSubmit' >
                        <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'campo obrigatório', type: 'string', max: 200 }]}>
                            <Input style={{ width: '100%' }} type='text' placeholder='Digite o seu nome' />
                        </Form.Item>

                        <Form.Item label="Idade" name="age" rules={[{ required: true, message: 'campo obrigatório', type: 'number' }]}>
                            <InputNumber style={{ width: '100%' }} type='number' controls={true} min={0} max={150} placeholder='digite a sua idade' />
                        </Form.Item>

                        <Button type='primary' htmlType='submit' className={styles.btnRegister}>
                            Cadastrar
                        </Button>
                    </Form>
                </Modal>

                <Modal
                    title="Edição de Pessoa"
                    footer={false}
                    open={isModalEdit}
                    onCancel={() => setIsModalEdit(false)}
                    className={styles.modalRegister}>


                    <Form form={editForm} onFinish={EditPerson} layout='vertical' validateTrigger='onSubmit' >
                        <Form.Item name="id" hidden>
                            <Input type="hidden" />
                        </Form.Item>
                        <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'campo obrigatório', type: 'string', max: 200 }]} >
                            <Input style={{ width: '100%' }} type='text' placeholder='Digite o seu nome' />
                        </Form.Item>

                        <Form.Item label="Idade" name="age" rules={[{ required: true, message: 'campo obrigatório', type: 'number' }]}>
                            <InputNumber style={{ width: '100%' }} type='number' controls={true} min={0} max={150} placeholder='digite a sua idade' />
                        </Form.Item>

                        <Button type='primary' htmlType='submit' className={styles.btnRegister}>
                            Atualizar
                        </Button>
                    </Form>
                </Modal>

                <Modal
                    title={<h2 style={{ margin: '0 0 12px 0' }}>Deleção de Pessoa</h2>}
                    open={isModalDelete}
                    onCancel={() => setIsModalDelete(false)}
                    onOk={() => DeletePerson()}
                    className={styles.modalRegister}>
                    <Typography style={{ fontSize: '15px' }}>Tem certeza que deseja excluir essa pessoa ? </Typography>
                </Modal>

            </div >
        </ConfigProvider>
    )
}