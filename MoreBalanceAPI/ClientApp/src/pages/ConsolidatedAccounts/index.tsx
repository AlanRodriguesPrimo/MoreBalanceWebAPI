import { Card, ConfigProvider, Table, theme, Typography, type TableColumnsType } from "antd"
import type { ConsolidatedCategorys, ConsolidatedPeople } from "../../Models/ConsolidateAccounts"
import styles from './style.module.css';

export const ConsolidatedAccounts = () => {

    const gridStyle: React.CSSProperties = {
        width: '25%',
        textAlign: 'center',
    };


    const columnsPeople: TableColumnsType<ConsolidatedPeople> = [
        {
            title: 'Pessoa',
            dataIndex: 'person',
            key: 'person',
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
            dataIndex: 'totalRevenues',
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
            dataIndex: 'category',
            key: 'category',
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
            dataIndex: 'totalRevenues',
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

    const dataSourcePeople = Array.from({ length: 30 }).map<ConsolidatedPeople>((_, i) => ({
        person: "Fulano",
        totalRevenues: 111000 + i * 5,
        totalExpenses: 121000 + i * 5,
        balance: 152151 + i * 5
    }));

    const dataSourceCategorys = Array.from({ length: 30 }).map<ConsolidatedCategorys>((_, i) => ({
        category: "categoria" + i,
        totalRevenues: 100 + i * 15,
        totalExpenses: 25 + i * 15,
        balance: 250 + i * 15
    }));

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
                                <Typography.Text ><b>{21321}</b> Pessoas</Typography.Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>
                                <Typography.Text ><b>{21321}</b> Receitas</Typography.Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>
                                <Typography.Text ><b>{21321}</b> Despesas</Typography.Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>
                                <Typography.Text ><b>{21321}</b> de saldo total</Typography.Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    )} />
            </div>


            <Typography.Title className={styles.titleSection}> Relatório de Categorias </Typography.Title>
            <div className={styles.divList}>
                <Table<ConsolidatedCategorys> columns={columnsCategory} className={styles.table} dataSource={dataSourceCategorys} pagination={{
                    pageSize: 7,
                    showSizeChanger: false,
                }}
                    summary={() => (
                        <Table.Summary.Row className={styles.tableSumaryRow}>
                            <Table.Summary.Cell index={0}>
                                <Typography.Text ><b>{21321}</b> Categorias</Typography.Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>
                                <Typography.Text ><b>{21321}</b> Receitas</Typography.Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>
                                <Typography.Text ><b>{21321}</b> Despesas</Typography.Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>
                                <Typography.Text ><b>{21321}</b> de saldo total</Typography.Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    )} />
            </div>
        </ConfigProvider>

    )
}