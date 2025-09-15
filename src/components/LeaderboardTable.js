import React from 'react';
import { formatWalletAddress, formatUSD, formatPercentage, formatTransactionCount, getPnLColorClass } from '../utils/formatters';
import './LeaderboardTable.css';

const LeaderboardTable = ({ data, currentSort, sortOptions, onSortChange }) => {
  // 根据当前排序获取对应的数值
  const getValue = (user, sortKey) => {
    switch (sortKey) {
      case 'total_pnl':
        return user.netProfitUSD || 0;
      case 'daily_pnl':
        return user.dailyStats?.netProfitUSD || 0;
      case 'weekly_pnl':
        return user.weeklyStats?.netProfitUSD || 0;
      case 'monthly_pnl':
        return user.monthlyStats?.netProfitUSD || 0;
      case 'weekly_winrate':
        return user.weeklyStats?.winRate || 0;
      case 'weekly_txs':
        return user.weeklyStats?.transactions || 0;
      default:
        return 0;
    }
  };

  // 获取胜率数据 - 直接使用后端返回的数据
  const getWinRate = (user) => {
    // 直接使用后端返回的胜率数据，不做计算
    return user.weeklyStats?.winRate || 0;
  };

  // 获取交易次数数据
  const getTransactionCount = (user) => {
    // 优先使用weeklyStats数据，如果不存在则使用总数据
    let result;
    
    if (user.weeklyStats && user.weeklyStats.transactions !== undefined) {
      // 使用weeklyStats数据（适用于7天交易量排行榜等）
      result = {
        profitable: user.weeklyStats.profitableTransactions || 0,
        loss: user.weeklyStats.lossTransactions || 0,
        total: user.weeklyStats.transactions || 0
      };
    } else {
      // 使用总数据（适用于其他排行榜）
      result = {
        profitable: user.profitableTransactions || 0,
        loss: user.lossTransactions || 0,
        total: user.totalTransactions || 0
      };
    }
    
    return result;
  };

  return (
    <div className="leaderboard-table-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th className="rank-column">#</th>
            <th className="wallet-column">Wallet Address</th>
            <th 
              className={`sortable-header pnl-column ${currentSort === 'total_pnl' ? 'active' : ''}`}
              onClick={() => onSortChange('total_pnl')}
            >
              Total PnL
            </th>
            <th 
              className={`sortable-header pnl-column ${currentSort === 'daily_pnl' ? 'active' : ''}`}
              onClick={() => onSortChange('daily_pnl')}
            >
              1D PnL
            </th>
            <th 
              className={`sortable-header pnl-column ${currentSort === 'weekly_pnl' ? 'active' : ''}`}
              onClick={() => onSortChange('weekly_pnl')}
            >
              7D PnL
            </th>
            <th 
              className={`sortable-header pnl-column ${currentSort === 'monthly_pnl' ? 'active' : ''}`}
              onClick={() => onSortChange('monthly_pnl')}
            >
              30D PnL
            </th>
            <th 
              className={`sortable-header winrate-column ${currentSort === 'weekly_winrate' ? 'active' : ''}`}
              onClick={() => onSortChange('weekly_winrate')}
            >
              7D Win Rate
            </th>
            <th 
              className={`sortable-header txs-column ${currentSort === 'weekly_txs' ? 'active' : ''}`}
              onClick={() => onSortChange('weekly_txs')}
            >
              7D TXs
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => {
            const winRate = getWinRate(user);
            const txCount = getTransactionCount(user);
            
            return (
              <tr key={user.userAddress || index} className="table-row">
                <td className="rank-cell">
                  <div className="rank-content">
                    <span className="rank-number">{index + 1}</span>
                    {index < 3 && (
                      <span className={`rank-badge rank-${index + 1}`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </span>
                    )}
                  </div>
                </td>
                
                <td className="wallet-cell">
                  <div className="wallet-content">
                    <div className="wallet-address">
                      {user.userAddress}
                    </div>
                  </div>
                </td>
                
                <td className={`pnl-cell ${getPnLColorClass(user.netProfitUSD || 0)}`}>
                  <div className="pnl-content">
                    <div className="pnl-percentage">
                      {user.netProfitUSD > 0 ? '+' : ''}{formatPercentage(user.profitRate || 0)}
                    </div>
                    <div className="pnl-amount">
                      {user.netProfitUSD > 0 ? '+' : ''}{formatUSD(user.netProfitUSD || 0)}
                    </div>
                  </div>
                </td>
                
                <td className={`pnl-cell ${getPnLColorClass(user.dailyStats?.netProfitUSD || 0)}`}>
                  <div className="pnl-content">
                    <div className="pnl-percentage">
                      {user.dailyStats?.netProfitUSD > 0 ? '+' : ''}{formatPercentage(user.dailyStats?.profitRate || 0)}
                    </div>
                    <div className="pnl-amount">
                      {user.dailyStats?.netProfitUSD > 0 ? '+' : ''}{formatUSD(user.dailyStats?.netProfitUSD || 0)}
                    </div>
                  </div>
                </td>
                
                
                <td className={`pnl-cell ${getPnLColorClass(user.weeklyStats?.netProfitUSD || 0)}`}>
                  <div className="pnl-content">
                    <div className="pnl-percentage">
                      {user.weeklyStats?.netProfitUSD > 0 ? '+' : ''}{formatPercentage(user.weeklyStats?.profitRate || 0)}
                    </div>
                    <div className="pnl-amount">
                      {user.weeklyStats?.netProfitUSD > 0 ? '+' : ''}{formatUSD(user.weeklyStats?.netProfitUSD || 0)}
                    </div>
                  </div>
                </td>
                
                <td className={`pnl-cell ${getPnLColorClass(user.monthlyStats?.netProfitUSD || 0)}`}>
                  <div className="pnl-content">
                    <div className="pnl-percentage">
                      {user.monthlyStats?.netProfitUSD > 0 ? '+' : ''}{formatPercentage(user.monthlyStats?.profitRate || 0)}
                    </div>
                    <div className="pnl-amount">
                      {user.monthlyStats?.netProfitUSD > 0 ? '+' : ''}{formatUSD(user.monthlyStats?.netProfitUSD || 0)}
                    </div>
                  </div>
                </td>
                
                <td className="winrate-cell">
                  <div className="winrate-content">
                    <div className="winrate-percentage">
                      {formatPercentage(winRate)}
                    </div>
                  </div>
                </td>
                
                <td className="txs-cell">
                  <div className="txs-content">
                    <div className="txs-total">
                      {formatTransactionCount(txCount.total)}
                    </div>
                    <div className="txs-breakdown">
                      <span className="txs-profitable">{txCount.profitable}</span>
                      /
                      <span className="txs-loss">{txCount.loss}</span>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
