const [searchresults, setSearchresults] = useState([]);
useEffect(() => {
  setSearchresults(popularProducts);
}, []);
const Filter = (event) => {
  setSearchresults(
    popularProducts.filter((product) =>
      product.name.toLowerCase().includes(event.target.value)
    )
  );
};

<input type="text" className="form-control" onChange={Filter} />;