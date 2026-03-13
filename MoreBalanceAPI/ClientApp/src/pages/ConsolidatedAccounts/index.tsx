import { Card, ConfigProvider, Table, theme, Typography, type TableColumnsType } from "antd"
import type { ConsolidatedCategorys, ConsolidatedPeople } from "../../Models/ConsolidateAccounts"
import styles from './style.module.css';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";

export const ConsolidatedAccounts = () => {
    const [dataSourcePeople, setDataSourcePeople] = useState<ConsolidatedPeople[]>([]);
    const [totalPeople, setTotalPeople] = useState<number>(0);
    const [totalExpensesPeople, setTotalExpensesPeople] = useState<number>(0);
    const [totalRevenuesPeople, setTotalRevenuesPeople] = useState<number>(0);
    const [totalBalancePeople, setTotalBalancePeople] = useState<number>(0);

    const [dataSourceCategory, setDataSourceCategory] = useState<ConsolidatedCategorys[]>([]);
    const [totalCategory, setTotalCategory] = useState<number>(0);
    const [totalExpensesCategory, setTotalExpensesCategory] = useState<number>(0);
    const [totalRevenuesCategory, setTotalRevenuesCategory] = useState<number>(0);
    const [totalBalanceCategory, setTotalBalanceCategory] = useState<number>(0);



    const gridStyle: React.CSSProperties = {
        width: '25%',
        textAlign: 'center',
    };

    const fetchInitialData = async () => {
        debugger;
        try {
            const respSumaryPeople = await api.get("api/GeneralSummary/GetSummaryPeople");
            if (respSumaryPeople.status === 200) {
                const peopleData = respSumaryPeople.data.peopleSummaries
                setDataSourcePeople(peopleData);
                setTotalPeople(respSumaryPeople.data.totalAmountPeople);
                setTotalExpensesPeople(respSumaryPeople.data.totalAmountExpenses);
                setTotalRevenuesPeople(respSumaryPeople.data.totalAmountRevenues);
                setTotalBalancePeople(respSumaryPeople.data.totalAmountBalance);
            }

            const respSumaryCategory = await api.get("api/GeneralSummary/GetSummaryCategory");
            if (respSumaryCategory.status === 200) {
                const CategoryData = respSumaryCategory.data.categorySummaries
                setDataSourceCategory(CategoryData);
                setTotalCategory(respSumaryCategory.data.totalAmountCategory);
                setTotalExpensesCategory(respSumaryCategory.data.totalAmountExpenses);
                setTotalRevenuesCategory(respSumaryCategory.data.totalAmountRevenues);
                setTotalBalanceCategory(respSumaryCategory.data.totalAmountBalance);
            }


        } catch (error) {
            toast.error("Erro interno ao buscar dados!");
        }
    }

    useEffect(() => {
        fetchInitialData();
    }, [])

    const columnsPeople: TableColumnsType<ConsolidatedPeople> = [
        {
            title: 'Pessoa',
            dataIndex: 'name',
            key: 'name',
            width: '40%'
        },
        {
            title: 'Total de receitas',
            dataIndex: 'totalRevenues',
            key: 'totalRevenues',
            width: '20%',
        },
        {
            title: 'Total de Despesas',
            dataIndex: 'totalExpenses',
            key: 'totalExpenses',
            width: '20%',
        },
        {
            title: 'Saldo',
            dataIndex: 'balance',
            key: 'balance',
            width: '20%',
        },
    ]

    const columnsCategory: TableColumnsType<ConsolidatedCategorys> = [
        {
            title: 'Categoria',
            dataIndex: 'description',
            key: 'description',
            width: '40%'
        },
        {
            title: 'Total de receitas',
            dataIndex: 'totalRevenues',
            key: 'totalRevenues',
            width: '20%',
        },
        {
            title: 'Total de Despesas',
            dataIndex: 'totalExpenses',
            key: 'totalExpenses',
            width: '20%',
        },
        {
            title: 'Saldo',
            dataIndex: 'balance',
            key: 'balance',
            width: '20%',
        },
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
            <Typography.Title className={styles.titleSection}> Relatório de Pessoas </Typography.Title>
            <div className={styles.divList}>
                <Table<ConsolidatedPeople> columns={columnsPeople} className={styles.table} dataSource={dataSourcePeople} pagination={{
                    pageSize: 7,
                    showSizeChanger: false,

                }}
                    summary={() => (
                        <Table.Summary.Row className={styles.tableSumaryRow}>
                            <Table.Summary.Cell index={0}>
                                <Typography.Text ><b>{totalPeople}</b> Pessoas</Typography.Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>
                                <Typography.Text ><b>{totalRevenuesPeople}</b> de Receitas</Typography.Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>
                                <Typography.Text ><b>{totalExpensesPeople}</b> de Despesas</Typography.Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={3}>
                                <Typography.Text ><b>{totalBalancePeople}</b> de saldo total</Typography.Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    )} />
            </div>


            <Typography.Title className={styles.titleSection}> Relatório de Categorias </Typography.Title>
            <div className={styles.divList}>
                <Table<ConsolidatedCategorys> columns={columnsCategory} className={styles.table} dataSource={dataSourceCategory} pagination={{
                    pageSize: 7,
                    showSizeChanger: false,
                }}
                    summary={() => (
                        <Table.Summary.Row className={styles.tableSumaryRow}>
                            <Table.Summary.Cell index={0}>
                                <Typography.Text ><b>{totalCategory}</b> Categorias</Typography.Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>
                                <Typography.Text ><b>{totalRevenuesCategory}</b> de Receitas</Typography.Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>
                                <Typography.Text ><b>{totalExpensesCategory}</b> de Despesas</Typography.Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={3}>
                                <Typography.Text ><b>{totalBalanceCategory}</b> de saldo total</Typography.Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    )} />
            </div>
        </ConfigProvider>

    )
}