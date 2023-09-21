import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { popularProducts } from "./Data";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});
const Gallerypage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // Filter images based on searchValue
    const filteredImages = popularProducts.filter((product) => {
      return product.name.some((name) =>
        name.toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    setFilteredImages(filteredImages);
  }, [searchValue]);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return; // No valid drop target
    }
    console.log(result);
    //the old array
    const newImages = [...filteredImages];
    const [removed] = newImages.splice(result.source.index, 1);
    console.log(removed);
    //create a new array with the new conditions

    newImages.splice(result.destination.index, 0, removed);
    setFilteredImages(newImages);
  };
  return (
    <>
      <form>
        <div>
          <i></i>
          <input
            type="text"
            name="search"
            placeholder="Search Images..."
            autoComplete="off"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
        </div>
      </form>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-[30px] md:gap-[20px] max-sm:gap-[25px]">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 h-60 w-full rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="image-grid" direction="both">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-[30px] md:gap-[20px] max-sm:gap-[25px]"
                {...provided.droppableProps}
                //   container
                //   spacing={2}
                //   style={{ backgroundColor: "teal" }}
              >
                {filteredImages.map((product, index) => (
                  <Draggable
                    key={product.id}
                    draggableId={index.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Card
                          sx={{
                            background: "red",
                            width: "300px",
                            padding: "8px",
                          }}
                        >
                          {/* <img
                            src={product.img}
                            style={{
                              height: 300,
                              width: "250px",
                              background: "blue",
                            }}
                            className="w-auto h-auto active:border-[5px] active:border-dashed active:border-[#ef5350]"
                          /> */}
                          test {index}
                        </Card>
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
};

export default Gallerypage;
