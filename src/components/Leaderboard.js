import React, { useState, useEffect } from 'react';
import { leaderboardAPI } from '../services/api';
import { appConfig } from '../config/app.config';
import LeaderboardTable from './LeaderboardTable';
import './Leaderboard.css';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSort, setCurrentSort] = useState(appConfig.defaultSort);

  // 排序选项配置 - 从配置文件获取
  const sortOptions = appConfig.sortOptions.map(option => ({
    ...option,
    apiCall: leaderboardAPI[option.apiCall]
  }));

  // 获取数据
  const fetchData = async (sortKey) => {
    setLoading(true);
    setError(null);
    
    try {
      const sortOption = sortOptions.find(option => option.key === sortKey);
      let result;
      
      if (sortKey === 'total_pnl') {
        // 总盈利使用getAllUsers接口
        result = await leaderboardAPI.getAllUsers(appConfig.pagination.defaultLimit);
        setData(result.users || []);
      } else {
        // 其他排序使用对应的排行榜接口
        result = await sortOption.apiCall(appConfig.pagination.defaultLimit);
        setData(result.leaderboard || []);
      }
    } catch (err) {
      console.error('获取排行榜数据失败:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 处理排序变更
  const handleSortChange = (sortKey) => {
    setCurrentSort(sortKey);
    fetchData(sortKey);
  };

  // 初始化加载
  useEffect(() => {
    fetchData(currentSort);
  }, [currentSort]);

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-container">
        <div className="error">错误: {error}</div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>{appConfig.title}</h1>
      </div>
      
      <LeaderboardTable 
        data={data}
        currentSort={currentSort}
        sortOptions={sortOptions}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default Leaderboard;
