import { Button, ConfigProvider, Form, Input, InputNumber, Modal, Select, Table, theme, Typography, type TableColumnsType } from "antd";
import type { TransactionsModel } from "../../Models/Transactions";
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { purposeLabel } from "../../Models/PurposeOptions";
import type { OptionProps } from "antd/es/select";
import type { OptionSelect } from "../../Models/OptionSelect";
import api from "../../api/api";
import { toast } from "react-toastify";
import type Item from "antd/es/list/Item";
import type { PeopleModel } from "../../Models/People";
import type { CategoryModel } from "../../Models/Categorys";

interface typesTransaction {
    label: string,
    value: number,
}

export const Transactions = () => {
    const [createForm] = Form.useForm();
    const [editForm] = Form.useForm();

    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [recordTransaction, setRecordTransaction] = useState<TransactionsModel>();

    const [personsOptionsCreate, setPersonsOptionsCreate] = useState<OptionSelect[]>([]);
    const [categsOptionsCreate, setCategsOptionsCreate] = useState<OptionSelect[]>([]);
    const [personsOptionsEdit, setPersonsOptionsEdit] = useState<OptionSelect[]>([]);
    const [categsOptionsEdit, setCategsOptionsEdit] = useState<OptionSelect[]>([]);

    const [allPersons, setAllPersons] = useState<PeopleModel[]>([]);
    const [allCateg, setAllCateg] = useState<CategoryModel[]>([]);
    const [dataSource, setDataSource] = useState<TransactionsModel[]>([]);
    const [typeOptions, setTypeOptions] = useState<typesTransaction[]>([{ label: "Despesa", value: 0 }, { label: "Receita", value: 1 }]);


    const onFinish = async (values: any) => {
        try {
            const resp = await api.post("api/transaction", values);
            if (resp.status == 200) {
                toast.success("Transação cadastrada com sucesso!");
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



    async function EditTransaction(values: any) {
        try {
            const resp = await api.put("api/transaction", values);
            if (resp.status == 200) {
                toast.success("Atualização realizada com sucesso!");
                editForm.resetFields();
                setIsModalEdit(false);
                fetchInitialData();
            } else {
                toast.error("Houve um erro ao atualizar!")
            }
        } catch (error) {
            toast.error("Erro interno ao atualizar!")
        }

    }

    async function DeleteTransaction() {
        try {
            if (recordTransaction?.id != null) {
                const resp = await api.delete(`api/transaction/${recordTransaction?.id}`);
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
            const listOptPersons: OptionSelect[] = []
            const listOptCateg: OptionSelect[] = []

            const respPersons = await api.get("api/person");
            if (respPersons.status == 200) {
                setAllPersons(respPersons.data);
                respPersons.data.forEach((x: PeopleModel) => {
                    var newOption: OptionSelect = { label: x.name, value: x.id }
                    listOptPersons.push(newOption);
                });
            };
            setPersonsOptionsCreate(listOptPersons);
            setPersonsOptionsEdit(listOptPersons);


            var respCategory = await api.get("api/category");
            if (respCategory.status == 200) {
                setAllCateg(respCategory.data);
                respCategory.data.forEach((x: CategoryModel) => {
                    var newOption: OptionSelect = { label: x.description, value: x.id }
                    listOptCateg.push(newOption);
                });
            };
            setCategsOptionsCreate(listOptCateg);
            setCategsOptionsEdit(listOptCateg);

            var resp = await api.get("api/transaction");
            if (resp.status == 200) {
                setDataSource(resp.data);
            }

        } catch (error) {
            toast.error("Erro interno ao buscar dados!")
        }
    }



    const columns: TableColumnsType<TransactionsModel> = [
        {
            title: "Pessoa",
            dataIndex: "personName",
            key: "personName",
            width: "20%",
        },
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
            dataIndex: "categoryName",
            key: "categoryName",
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
                        setRecordTransaction(record);
                    }} />
                    <DeleteOutlined style={{ color: '#ff4d4f' }} onClick={() => {
                        setIsModalDelete(true);
                        setRecordTransaction(record);
                    }} />
                </div>
            ),
        }
    ]

    useEffect(() => {
        editForm.setFieldsValue({ id: recordTransaction?.id, person: recordTransaction?.personId, description: recordTransaction?.description, value: recordTransaction?.value, type: recordTransaction?.type, category: recordTransaction?.categoryId });
    }, [recordTransaction])

    useEffect(() => {
        fetchInitialData();
    }, [])


    const personValueCreate = Form.useWatch("person", createForm);
    useEffect(() => {
        debugger
        if (personValueCreate == undefined) return;
        const person = allPersons.find(x => x.id === personValueCreate);
        if (person == undefined) return;

        if (person.age < 18) {
            setTypeOptions(typeOptions.filter(x => x.value === 0));
            createForm.setFieldsValue({ type: 0 })
            const categsUpdate = allCateg.filter(x => x.purpose === 0);
            if (categsUpdate == undefined) return;
            setCategsOptionsCreate(categsUpdate.map(x => {
                return (
                    { label: x.description, value: x.id }
                )
            }))
        } else {
            setTypeOptions([
                { label: "Despesa", value: 0 },
                { label: "Receita", value: 1 }
            ]);
        }
    }, [personValueCreate]);

    const personValueEdit = Form.useWatch("person", editForm);
    useEffect(() => {
        debugger
        if (personValueEdit == undefined) return;
        const person = allPersons.find(x => x.id === personValueEdit);
        if (person == undefined) return;

        if (person.age < 18) {
            setTypeOptions(typeOptions.filter(x => x.value === 0));
            editForm.setFieldsValue({ type: 0 })
            const categsUpdate = allCateg.filter(x => x.purpose === 0 || x.purpose == 2);
            if (categsUpdate == undefined) return;
            var listCategss = categsUpdate.map(x => {
                return (
                    { label: x.description, value: x.id }
                )
            })
            setCategsOptionsEdit(listCategss)
        } else {
            if (allCateg == undefined) return;
            setCategsOptionsEdit(allCateg.map(x => {
                return (
                    { label: x.description, value: x.id }
                )
            }))
            setTypeOptions([
                { label: "Despesa", value: 0 },
                { label: "Receita", value: 1 }
            ]);
        }
    }, [personValueEdit]);

    const typeValueEdit = Form.useWatch("type", editForm);
    useEffect(() => {
        debugger;
        if (typeValueEdit == undefined) return;


        const categsUpdate = allCateg.filter(x => x.purpose === typeValueEdit || x.purpose == 2);
        if (categsUpdate == undefined) return;
        setCategsOptionsEdit(categsUpdate.map(x => {
            return (
                { label: x.description, value: x.id }
            )
        }))
    }, [typeValueEdit]);

    const typeValueCreate = Form.useWatch("type", createForm);
    useEffect(() => {
        debugger
        if (typeValueCreate == undefined) return;
        const categsUpdate = allCateg.filter(x => x.purpose === typeValueCreate || x.purpose == 2);
        if (categsUpdate == undefined) return;
        createForm.setFieldsValue({ category: undefined })
        setCategsOptionsCreate(categsUpdate.map(x => {
            return (
                { label: x.description, value: x.id }
            )
        }))
    }, [typeValueCreate]);




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
                    maskClosable={false}
                    className={styles.modalRegister}>


                    <Form form={createForm} onFinish={onFinish} layout='vertical' validateTrigger='onSubmit' >

                        <Form.Item label="Pessoa" name="person" rules={[{ required: true, message: 'campo obrigatório' }]}>
                            <Select
                                placeholder="Selecione a pessoa..."
                                options={personsOptionsCreate}
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
                                options={typeOptions}
                            />
                        </Form.Item>

                        <Form.Item label="Categoria" name="category" rules={[{ required: true, message: 'campo obrigatório' }]}>
                            <Select
                                placeholder="Selecione o tipo..."
                                options={categsOptionsCreate}
                            />
                        </Form.Item>



                        <Button type='primary' htmlType='submit' className={styles.btnRegister}>
                            Adicionar
                        </Button>
                    </Form>
                </Modal>

                <Modal
                    title="Edição de Transação"
                    footer={false}
                    open={isModalEdit}
                    maskClosable={false}
                    onCancel={() => setIsModalEdit(false)}
                    className={styles.modalRegister}>


                    <Form form={editForm} onFinish={EditTransaction} layout='vertical' validateTrigger='onSubmit' >
                        <Form.Item name="id" hidden>
                            <Input type="hidden" />
                        </Form.Item>
                        <Form.Item label="Pessoa" name="person" rules={[{ required: true, message: 'campo obrigatório' }]}>
                            <Select
                                placeholder="Selecione a pessoa..."
                                options={personsOptionsEdit}
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
                                options={typeOptions}
                                onChange={() => {
                                    editForm.setFieldsValue({ category: undefined })
                                }}
                            />
                        </Form.Item>

                        <Form.Item label="Categoria" name="category" rules={[{ required: true, message: 'campo obrigatório' }]}>
                            <Select
                                placeholder="Selecione o tipo..."
                                options={categsOptionsEdit}
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
                    onOk={() => DeleteTransaction()}
                    maskClosable={false}
                    className={styles.modalRegister}>
                    <Typography style={{ fontSize: '15px' }}>Tem certeza que deseja excluir essa transação ? </Typography>
                </Modal>

            </div >
        </ConfigProvider>
    )
}