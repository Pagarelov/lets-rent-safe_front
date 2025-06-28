import React, { useState, useEffect } from "react";
import styles from "./CatalogPage.module.scss";
import { getClients } from '../../api/endpoints/client';

const CatalogPage = () => {
  const [filters, setFilters] = useState({
    city: "",
    district: "",
    floorFrom: "",
    floorTo: "",
    year: "2025",
  });
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getClients()
      .then(data => {
        setClients(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(e => {
        setError('Ошибка загрузки каталога');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.catalogPage}>
      <input
        className={styles.search}
        placeholder="Поиск жк"
        type="text"
      />
      <h1>Каталог новостроек</h1>
      <div className={styles.filters}>
        <div className={styles.filterRow}>
          <div>
            <label>Город</label>
            <select name="city" value={filters.city} onChange={handleChange}>
              <option value="">Город</option>
              <option value="Москва">Москва</option>
              <option value="Санкт-Петербург">Санкт-Петербург</option>
            </select>
          </div>
          <div>
            <label>Район</label>
            <select name="district" value={filters.district} onChange={handleChange}>
              <option value="">Район</option>
              <option value="Центральный">Центральный</option>
              <option value="Северный">Северный</option>
            </select>
          </div>
        </div>
        <div className={styles.filterRow}>
          <div>
            <label>Этажность</label>
            <input
              name="floorFrom"
              placeholder="от"
              value={filters.floorFrom}
              onChange={handleChange}
              className={styles.smallInput}
            />
            <input
              name="floorTo"
              placeholder="до"
              value={filters.floorTo}
              onChange={handleChange}
              className={styles.smallInput}
            />
          </div>
          <div>
            <label>Год сдачи</label>
            <select name="year" value={filters.year} onChange={handleChange}>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>
        </div>
      </div>
      {loading ? (
        <div>Загрузка...</div>
      ) : error ? (
        <div style={{color: 'red'}}>{error}</div>
      ) : (
        <div className={styles.cardsGrid}>
          {clients.map((item) => (
            <div key={item.id} className={styles.card}>
              <img src={item.image || ''} alt={item.name || ''} className={styles.cardImage} />
              <div className={styles.cardInfo}>
                <div className={styles.price}>От {item.price} ₽</div>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.flats}>{item.flats} квартир</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;