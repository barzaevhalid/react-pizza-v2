import React from 'react';

const Categories = () => {
    const [categories, setCategories]  = React.useState(["Все", "Мясные", "Вегетарианская",  "Гриль", "Острые", "Закрытые"])
    const [activeIndex, setActiveIndex] = React.useState(0)


    return (
        <div className="categories">
              <ul>
                  {
                      categories.map((item, idx) =>
                          <li
                              key={idx}
                              className={activeIndex === idx ? "active" : ""}
                              onClick={() => setActiveIndex(idx)}
                          >{item}</li>)
                  }
              </ul>
            </div>
    );
};

export default Categories;
