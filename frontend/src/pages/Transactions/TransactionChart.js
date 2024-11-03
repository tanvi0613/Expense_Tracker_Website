// import React from 'react'
// import { useQuery } from "@tanstack/react-query";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// import { listTransactionsAPI } from '../../services/transactions/transactionService';

// ChartJS.register(ArcElement, Tooltip, Legend);


// function TransactionChart() {

//     const {
//         data: transactions
//       } = useQuery({
//         queryFn: listTransactionsAPI,
//         queryKey: ["list-transactions"],
//       });

//     //calculate total income and expense
//     const totals = transactions?.reduce(
//         (acc, transaction) => {
//         if (transaction?.type === "income") {
//             acc.income += transaction?.amount;
//         } else {
//             acc.expense += transaction?.amount;
//         }
//         return acc;
//         },
//         { income: 0, expense: 0 }
//     );
    
//     //Data structure for the chart otherwise won't be able to display on chart
//     const data = {
//         labels: ["Income", "Expense"],
//         datasets: [
//         {
//             label: "Transactions",
//             data: [totals?.income, totals?.expense],
//             backgroundColor: ["#36A2EB", "#FF6384"],
//             borderColor: ["#36A2EB", "#FF6384"],
//             borderWith: 1,
//             hoverOffset: 4,
//         },
//         ],
//     };

//     const options = {
//         maintainAspectRatio: false,
//         plugins: {
//           legend: {
//             position: "bottom",
//             labels: {
//               padding: 25,
//               boxWidth: 12,
//               font: {
//                 size: 14,
//               },
//             },
//           },
//           title: {
//             display: true,
//             text: "Income vs Expense",
//             font: {
//               size: 18,
//               weight: "bold",
//             },
//             padding: {
//               top: 10,
//               bottom: 30,
//             },
//           },
//         },
//         cutout: "70%",
//       };

//     return (
//         <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
//             <h1 className="text-2xl font-bold text-center mb-6">
//                 Transaction Overview
//             </h1>
//             <div style={{ height: "350px" }}>
//                 <Doughnut data={data} options={options} />
//             </div>
//         </div>
//     )
// }

// export default TransactionChart


import React from 'react';
import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { listTransactionsAPI } from '../../services/transactions/transactionService';
import './TransactionChart.css';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TransactionChart() {
  const { data: transactions } = useQuery({
    queryFn: listTransactionsAPI,
    queryKey: ["list-transactions"],
  });

  // Calculate total income and expense
  const totals = transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.type === "income") {
        acc.income += transaction?.amount;
      } else if (transaction?.type === "expense") {
        acc.expense += transaction?.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );
  
  // Prepare data for the line chart with income and expense over time
  const transactionDates = transactions?.map((transaction) =>
    new Date(transaction.date).toLocaleDateString()
  );

  const incomeData = transactions?.map((transaction) =>
    transaction.type === "income" ? transaction.amount : 0
  );

  const expenseData = transactions?.map((transaction) =>
    transaction.type === "expense" ? transaction.amount : 0
  );

  const data = {
    labels: transactionDates || [],
    datasets: [
      {
        label: "Income",
        data: incomeData || [],
        backgroundColor: "#1ABC9C",
        borderColor: "#1ABC9C",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Expense",
        data: expenseData || [],
        backgroundColor: "#8E44AD",
        borderColor: "#8E44AD",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 12,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Income vs Expense Over Time",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
        beginAtZero: true,
      },
    },
  };

  const recentTransactions = transactions?.slice(-5).reverse();
  return (
    <>
      <div className="chart-main">
      <h1 className="chart-text">
        Transaction Overview
      </h1>
      <div style={{ height: "350px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
    <div className="chart-totals">
        <div className="chart-income-display">
          Total Income: ${totals?.income || 0}
        </div>
        <div className="chart-expense-display">
          Total Expense: ${totals?.expense || 0}
        </div>
    </div>

    <h2 className="chart-text-history"><span>Recent History</span></h2>
    <div className="recent-transactions">
    {recentTransactions?.length > 0 ? (
      <ul className="transaction-list-recent">
        {recentTransactions.map((transaction) => (
          <li
            key={transaction._id}
            className="transaction-item-recent"
          >
            <span>{transaction.description}</span>
            <span className={`amount ${transaction.type}`}>
              ${transaction.amount}
            </span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="no-transactions">No recent transactions available</p>
    )}
  </div>
    </>
  );
}

export default TransactionChart;
