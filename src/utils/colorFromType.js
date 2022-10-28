const colorFromType = (type) => {
  switch (type) {
    case "normal":
      return "#aaa67f";
    case "fighting":
      return "#c12239";
    case "flying":
      return "#a891ec";
    case "poison":
      return "#a43e9e";
    case "ground":
      return "#dec16b";
    case "rock":
      return "#b69e31";
    case "bug":
      return "#a7b723";
    case "ghost":
      return "#70559b";
    case "steel":
      return "#b7b9d0";
    case "fire":
      return "#f57d31";
    case "water":
      return "#6493eb";
    case "grass":
      return "#74cb48";
    case "electric":
      return "#f9cf30";
    case "psychic":
      return "#fb5584";
    case "ice":
      return "#9ad6df";
    case "dragon":
      return "#7037ff";
    case "dark":
      return "#75574c";
    case "fairy":
      return "#e69eac";
    default:
      return "#ffffff";
  }
};

export default colorFromType;
