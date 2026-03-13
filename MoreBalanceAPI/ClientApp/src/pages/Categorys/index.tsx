import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input, InputNumber, Modal, Select, Table, theme, Typography, type TableColumnsType } from "antd";
import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import type { CategoryModel } from '../../Models/Categorys';
import { purposeLabel, PurposeOptions } from '../../Models/PurposeOptions';
import api from '../../api/api';
import { toast } from 'react-toastify';

type typePurpose = 1 | 2 | 3

export const Categorys = () => {
    const [createForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [recordCategory, setRecordCategory] = useState<CategoryModel>();
    const [type, setType] = useState<typePurpose | undefined>();
    const [dataSource, setDataSource] = useState<CategoryModel[]>([]);

    async function EditCategory(values: any) {
        try {
            debugger;
            const resp = await api.put("api/category", values);
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

    async function DeleteCategory() {
        try {
            if (recordCategory?.Id != null) {
                debugger;
                const resp = await api.delete(`api/category/${recordCategory?.Id}`);
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
            var resp = await api.get("api/category");
            setDataSource(resp.data);

        } catch (error) {
            toast.error("Erro interno ao buscar dados!")
        }
    }
    const onFinish = async (values: any) => {
        try {
            debugger;
            const resp = await api.post("api/category", values);
            if (resp.status == 200) {
                toast.success("Categoria cadastrada com sucesso!");
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
        editForm.setFieldsValue({ id: recordCategory?.Id, age: recordCategory?.Description, name: recordCategory?.Purpose });
    }, [recordCategory])

    useEffect(() => {
        fetchInitialData();
    }, [])






    const columns: TableColumnsType<CategoryModel> = [
        {
            title: 'Descrição',
            dataIndex: 'Description',
            key: 'description',
            width: '40%'
        },
        {
            title: 'Finalidade',
            dataIndex: 'Purpose',
            key: 'purpose',
            width: '40%',
            render: (_, record) => {
                return (
                    <Typography.Text>{purposeLabel[record.Purpose]}</Typography.Text>
                )
            }
        },
        {
            title: 'Ações',
            key: 'actions',
            width: '20%',
            render: (_, record) => (
                <div className={styles.divActions}>
                    <EditOutlined style={{ color: '#096dd9' }} onClick={() => {
                        setIsModalEdit(true);
                        setRecordCategory(record);
                    }} />
                    <DeleteOutlined style={{ color: '#ff4d4f' }} onClick={() => {
                        setIsModalDelete(true);
                        setRecordCategory(record);
                    }} />
                </div>
            ),
        }
    ]

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
                    <Typography.Title className={styles.titleSection}> Categorias </Typography.Title>
                    <Button size='large' className={styles.buttonAdd} icon={<PlusOutlined style={{ marginRight: '4px' }} />} onClick={() => setIsModalCreate(true)} > Adicionar Categoria </Button>
                </div>

                <div className={styles.divList}>
                    <Table<CategoryModel> columns={columns} className={styles.table} dataSource={dataSource} pagination={{
                        pageSize: 7,
                        showSizeChanger: false,
                    }} />
                </div>

                <Modal
                    title="Cadastro de Categoria"
                    footer={false}
                    open={isModalCreate}
                    onCancel={() => setIsModalCreate(false)}
                    className={styles.modalRegister}>


                    <Form form={createForm} layout='vertical' validateTrigger='onSubmit' >
                        <Form.Item label="Descrição" name="description" rules={[{ required: true, message: 'campo obrigatório', type: 'string', max: 400 }]}>
                            <Input style={{ width: '100%' }} type='text' placeholder='Digite o nome da categoria' />
                        </Form.Item>

                        <Form.Item label="Finalidade" name="purpose" rules={[{ required: true, message: 'campo obrigatório' }]}>
                            <Select<typePurpose>
                                placeholder="Selecione o tipo"
                                style={{ width: '200' }}
                                options={PurposeOptions}
                                value={type}
                                onChange={(x) => setType(x)}

                            />
                        </Form.Item>

                        <Button type='primary' htmlType='submit' className={styles.btnRegister}>
                            Cadastrar
                        </Button>
                    </Form>
                </Modal>

                <Modal
                    title="Edição de Categoria"
                    footer={false}
                    open={isModalEdit}
                    onCancel={() => setIsModalEdit(false)}
                    className={styles.modalRegister}>


                    <Form form={editForm} layout='vertical' validateTrigger='onSubmit' >
                        <Form.Item name="id" hidden>
                            <Input type="hidden" />
                        </Form.Item>
                        <Form.Item label="Descrição" name="description" rules={[{ required: true, message: 'campo obrigatório', type: 'string', max: 400 }]}>
                            <Input style={{ width: '100%' }} type='text' placeholder='Digite o seu nome' />
                        </Form.Item>

                        <Form.Item label="Finalidade" name="purpose" rules={[{ required: true, message: 'campo obrigatório' }]}>
                            <Select<typePurpose>
                                placeholder="Selecione o tipo"
                                style={{ width: '200' }}
                                options={PurposeOptions}
                                value={type}
                                onChange={(x) => setType(x)}

                            />
                        </Form.Item>

                        <Button type='primary' htmlType='submit' className={styles.btnRegister}>
                            Atualizar
                        </Button>
                    </Form>
                </Modal>

                <Modal
                    title={<h2 style={{ margin: '0 0 12px 0' }}>Deleção de Categoria</h2>}
                    open={isModalDelete}
                    onCancel={() => setIsModalDelete(false)}
                    onOk={() => DeleteCategory()}
                    className={styles.modalRegister}>
                    <Typography style={{ fontSize: '15px' }}>Tem certeza que deseja excluir essa categoria ? </Typography>
                </Modal>

            </div >
        </ConfigProvider>
    )
}