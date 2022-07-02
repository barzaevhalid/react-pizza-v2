const Categories = ({value, onClickCategory}) => {
    const categories = ["Все", "Мясные", "Вегетарианская",  "Гриль", "Острые", "Закрытые"]
    return (
        <div className="categories">
              <ul>
                  {
                      categories.map((item, idx) =>
                          <li
                              key={idx}
                              className={value === idx ? "active" : ""}
                              onClick={() => onClickCategory(idx)}
                          >{item}</li>)
                  }
              </ul>
            </div>
    );
};

export default Categories;
