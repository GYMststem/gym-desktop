import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceSync = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 中间件API地址
  const middlewareUrl = 'http://localhost:3030/api';

  // 获取考勤数据
  const fetchAttendance = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${middlewareUrl}/attendance`);
      setAttendance(response.data.data || []);
      setSuccess('考勤数据获取成功');
    } catch (err) {
      setError('获取考勤数据失败: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // 手动同步考勤数据
  const syncAttendance = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${middlewareUrl}/attendance/sync`);
      setSuccess('考勤数据同步成功');
      // 同步后刷新数据
      fetchAttendance();
    } catch (err) {
      setError('同步考勤数据失败: ' + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };

  useEffect(() => {
    // 组件加载时获取考勤数据
    fetchAttendance();
  }, []);

  return (
    <div className="attendance-sync-container">
      <h2>考勤数据同步</h2>
      
      <div className="actions">
        <button 
          onClick={fetchAttendance} 
          disabled={loading}
          className="btn btn-primary"
        >
          刷新数据
        </button>
        <button 
          onClick={syncAttendance} 
          disabled={loading}
          className="btn btn-success"
        >
          手动同步
        </button>
      </div>

      {loading && <div className="loading">加载中...</div>}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      <div className="attendance-list">
        <h3>考勤记录 ({attendance.length})</h3>
        
        {attendance.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>用户ID</th>
                <th>状态</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record, index) => (
                <tr key={index}>
                  <td>{record.userId || record.user_id}</td>
                  <td>{record.status || '打卡'}</td>
                  <td>{new Date(record.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>暂无考勤记录</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceSync; 