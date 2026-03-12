import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input, InputNumber, Modal, Select, Table, theme, Typography, type TableColumnsType } from "antd";
import { useState } from 'react';
import styles from './styles.module.css'
import type { CategoryModel } from '../../Models/Categorys';
import { purposeLabel, PurposeOptions } from '../../Models/PurposeOptions';

type typePurpose = 1 | 2 | 3

export const Categorys = () => {
    const [form] = Form.useForm();
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [recordPersonId, setRecordPersonId] = useState("");
    const [type, setType] = useState<typePurpose | undefined>();

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
                        setRecordPersonId(record.CategoryId);
                    }} />
                    <DeleteOutlined style={{ color: '#ff4d4f' }} onClick={() => {
                        setIsModalDelete(true);
                        setRecordPersonId(record.CategoryId);
                    }} />
                </div>
            ),
        }
    ]

    const dataSource = Array.from({ length: 30 }).map<CategoryModel>((_, i) => ({
        CategoryId: "" + i,
        Description: `Description ${i}`,
        Purpose: i <= 10 ? 0 : i <= 20 ? 1 : 2
    }));

    function DeletePerson(): void {
        throw new Error('Function not implemented.');
    }

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
                    title="Cadastro de Pessoa"
                    footer={false}
                    open={isModalCreate}
                    onCancel={() => setIsModalCreate(false)}
                    className={styles.modalRegister}>


                    <Form form={form} layout='vertical' validateTrigger='onSubmit' >
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


                    <Form form={form} layout='vertical' validateTrigger='onSubmit' >
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
                    onOk={() => DeletePerson()}
                    className={styles.modalRegister}>
                    <Typography style={{ fontSize: '15px' }}>Tem certeza que deseja excluir essa categoria ? </Typography>
                </Modal>

            </div >
        </ConfigProvider>
    )
}