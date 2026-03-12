import { Button, ConfigProvider, Form, Input, InputNumber, Modal, Select, Table, theme, Typography, type TableColumnsType } from "antd";
import type { TransactionsModel } from "../../Models/Transactions";
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import styles from "./styles.module.css";
import { useState } from "react";
import { purposeLabel } from "../../Models/PurposeOptions";

const peopleSelects = [
    { value: 1, label: 'alan' },
    { value: 2, label: 'fulano' }
]

export const Transactions = () => {
    const [form] = Form.useForm();
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [recordTransactionId, setRecordTransactionId] = useState("");
    
    const columns: TableColumnsType<TransactionsModel> = [
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
            width: '30%'
        },
        {
            title: "Valor",
            dataIndex: "value",
            key: "value",
            width: "10%",
        },
        {
            title: "Pessoa",
            dataIndex: "person",
            key: "person",
            width: "20%"
        },
        {
            title: "tipo",
            dataIndex: "type",
            key: "type",
            width: "10%",
            render: (_, record) => (
                <Typography>{purposeLabel[record.type]}</Typography>
            )
        },
        {
            title: "Categoria",
            dataIndex: "category",
            key: "category",
            width: "20%"
        },

        {
            title: 'Ações',
            key: 'actions',
            width: '2%',
            render: (_, record) => (
                <div className={styles.divActions}>
                    <EditOutlined style={{ color: '#096dd9' }} onClick={() => {
                        setIsModalEdit(true);
                        setRecordTransactionId(record.transactionId);
                    }} />
                    <DeleteOutlined style={{ color: '#ff4d4f' }} onClick={() => {
                        setIsModalDelete(true);
                        setRecordTransactionId(record.transactionId);
                    }} />
                </div>
            ),
        }
    ]
    const dataSource = Array.from({ length: 30 }).map<TransactionsModel>((_, i) => ({
        transactionId: "" + i,
        description: `Nome ${i}`,
        type: i <= 10 ? 0 : i <= 20 ? 1 : 2,
        value: 130 + i,
        category: "categoria" + i,
        person: "Fulano" + i
    }));

    function DeletePerson(): void {
        throw new Error("Function not implemented.");
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
                    <Typography.Title className={styles.titleSection}>Transações</Typography.Title >
                    <Button size='large' className={styles.buttonAdd} icon={<PlusOutlined style={{ marginRight: '4px' }} />} onClick={() => setIsModalCreate(true)} > Adicionar Transação</Button>
                </div>

                <div className={styles.divList}>
                    <Table<TransactionsModel> columns={columns} className={styles.table} dataSource={dataSource} pagination={{
                        pageSize: 7,
                        showSizeChanger: false,
                    }} />
                </div>

                <Modal
                    title="Adicionar Transação"
                    footer={false}
                    open={isModalCreate}
                    onCancel={() => setIsModalCreate(false)}
                    className={styles.modalRegister}>


                    <Form form={form} layout='vertical' validateTrigger='onSubmit' >

                        <Form.Item label="Pessoa" name="person" rules={[{ required: true, message: 'campo obrigatório' }]}>
                            <Select
                                placeholder="Selecione a pessoa..."
                                options={[{ label: "Alan", value: "asdasd" }, { label: "João", value: "asd" }]}
                            />
                        </Form.Item>

                        <Form.Item label="Descrição" name="description" rules={[{ required: true, message: 'campo obrigatório', type: 'string', max: 400 }]}>
                            <Input style={{ width: '100%' }} type='text' placeholder='Insira a descrição...' />
                        </Form.Item>

                        <Form.Item label="Valor" name="value" rules={[{ required: true, message: 'campo obrigatório', type: 'number' }]}>
                            <InputNumber<number>
                                style={{ width: "100%" }}
                                min={0}
                                step={0.01}
                                precision={2}
                                formatter={(value) =>
                                    value
                                        ? `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                                        : ""
                                }
                                parser={(value) =>
                                    value
                                        ? Number(
                                            value
                                                .replace(/\s?R\$\s?/g, "")
                                                .replace(/\./g, "")
                                                .replace(",", ".")
                                        )
                                        : 0
                                }
                            />
                        </Form.Item>

                        <Form.Item label="Tipo" name="type" rules={[{ required: true, message: 'campo obrigatório' }]}>
                            <Select
                                placeholder="Selecione o tipo..."
                                options={[{ label: "Despesa", value: 0 }, { label: "Receita", value: 1 }]}
                            />
                        </Form.Item>

                        <Form.Item label="Categoria" name="category" rules={[{ required: true, message: 'campo obrigatório' }]}>
                            <Select
                                placeholder="Selecione o tipo..."
                                options={[{ label: "Trabalho", value: "asdasdas" }, { label: "Contas", value: "asdasd" }]}
                            />
                        </Form.Item>



                        <Button type='primary' htmlType='submit' className={styles.btnRegister}>
                            Adicionar
                        </Button>
                    </Form>
                </Modal>

                <Modal
                    title="Edição de Pessoa"
                    footer={false}
                    open={isModalEdit}
                    onCancel={() => setIsModalEdit(false)}
                    className={styles.modalRegister}>


                    <Form form={form} layout='vertical' validateTrigger='onSubmit' >
                        <Form.Item label="Pessoa" name="person" rules={[{ required: true, message: 'campo obrigatório' }]}>
                            <Select
                                placeholder="Selecione a pessoa..."
                                options={[{ label: "Alan", value: "asdasd" }, { label: "João", value: "asd" }]}
                            />
                        </Form.Item>

                        <Form.Item label="Descrição" name="description" rules={[{ required: true, message: 'campo obrigatório', type: 'string', max: 400 }]}>
                            <Input style={{ width: '100%' }} type='text' placeholder='Insira a descrição...' />
                        </Form.Item>

                        <Form.Item label="Valor" name="value" rules={[{ required: true, message: 'campo obrigatório', type: 'number' }]}>
                            <InputNumber<number>
                                style={{ width: "100%" }}
                                min={0}
                                step={0.01}
                                precision={2}
                                formatter={(value) =>
                                    value
                                        ? `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                                        : ""
                                }
                                parser={(value) =>
                                    value
                                        ? Number(
                                            value
                                                .replace(/\s?R\$\s?/g, "")
                                                .replace(/\./g, "")
                                                .replace(",", ".")
                                        )
                                        : 0
                                }
                            />
                        </Form.Item>

                        <Form.Item label="Tipo" name="type" rules={[{ required: true, message: 'campo obrigatório' }]}>
                            <Select
                                placeholder="Selecione o tipo..."
                                options={[{ label: "Despesa", value: 0 }, { label: "Receita", value: 1 }]}
                            />
                        </Form.Item>

                        <Form.Item label="Categoria" name="category" rules={[{ required: true, message: 'campo obrigatório' }]}>
                            <Select
                                placeholder="Selecione o tipo..."
                                options={[{ label: "Trabalho", value: "asdasdas" }, { label: "Contas", value: "asdasd" }]}
                            />
                        </Form.Item>


                        <Button type='primary' htmlType='submit' className={styles.btnRegister}>
                            Atualizar
                        </Button>
                    </Form>
                </Modal>

                <Modal
                    title={<h2 style={{ margin: '0 0 12px 0' }}>Exclusão de Transação</h2>}
                    open={isModalDelete}
                    onCancel={() => setIsModalDelete(false)}
                    onOk={() => DeletePerson()}
                    className={styles.modalRegister}>
                    <Typography style={{ fontSize: '15px' }}>Tem certeza que deseja excluir essa transação ? </Typography>
                </Modal>

            </div >
        </ConfigProvider>
    )
}