import { useState, useRef, useEffect } from "react";
import { CircularProgress, Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "#1a202c",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

function Images({ searchTag }) {
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [tag, setTag] = useState("jungle");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPhotos([]);
    setPage(1);
  }, [tag]);

  useEffect(() => {
    setTag(searchTag);
    setLoading(true);
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
        import.meta.env.VITE_API_KEY
      }&tags=${tag}&per_page=20&page=${page}&format=json&nojsoncallback=1`,
    )
      .then((response) => response.json())
      .then((data) => {
        setPhotos((prevPhotos) => [...prevPhotos, ...data.photos.photo]);
        setLoading(false);
        if (data.photos.page >= data.photos.pages) {
          setHasMore(false);
        }
      })
      .catch((error) => console.error(error));
  }, [tag, searchTag, page]);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 },
    ),
  );

  const ref = useRef(null);
  useEffect(() => {
    observer.current.observe(ref.current);
    return () => {
      observer.current.disconnect();
    };
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {photos[selectedIndex] && (
            <>
              <img
                src={`https://live.staticflickr.com/${photos[selectedIndex].server}/${photos[selectedIndex].id}_${photos[selectedIndex].secret}.jpg`}
                alt={photos[selectedIndex].title}
                className="object-fill"
              />
              <p className="text-[#fff] text-lg font-semibold">
                {photos[selectedIndex].title}
              </p>
            </>
          )}
        </Box>
      </Modal>

      <div className="grid grid-cols-5 gap-4 bg-[#060c18] ml-3 mr-3 p-3">
        {photos.map((photo, index) => (
          <img
            onClick={() => {
              setSelectedIndex(index);
              handleOpen();
            }}
            key={photo.id}
            src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
            alt={photo.title}
            className="object-contain h-60 w-full shadow-2xl bg-[#ffffffd8] rounded-xl cursor-pointer"
          />
        ))}
      </div>

      {hasMore && (
        <div
          ref={ref}
          className="flex justify-center items-center"
        >
          <CircularProgress />
        </div>
      )}

      {!hasMore && (
        <div className="flex justify-center items-center text-[#c7c3c3]">
          No more results...
        </div>
      )}
    </>
  );
}

export default Images;
