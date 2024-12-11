import React, { useRef, useEffect } from 'react';
import { Modal, Carousel, Button } from 'antd';
import { AlbumImageItemResponse } from '@/schemas';

interface ImageModalProps {
  visible: boolean;
  onCancel: () => void;
  images: AlbumImageItemResponse[];
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
                                                 visible,
                                                 onCancel,
                                                 images,
                                                 selectedImageIndex,
                                                 setSelectedImageIndex,
                                               }) => {
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.goTo(selectedImageIndex, true);
    }
  }, [selectedImageIndex]);

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      width="80%"
      className="overflow-hidden"
    >
      <div>
        <Carousel
          ref={carouselRef}
          initialSlide={selectedImageIndex || 0}
          afterChange={(current) => setSelectedImageIndex(current)}
        >
          {images.map((image, index) => (
            <div className="flex justify-center" key={index}>
              <img
                src={image?.s3_image_url || '/assets/images/DetailEvent.png'}
                alt={`Image ${index}`}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </Carousel>

        <div className="flex justify-between mt-4">
          <Button onClick={() => carouselRef.current?.prev()} className="bg-[#275FC1] text-white">
            Previous
          </Button>
          <Button onClick={() => carouselRef.current?.next()} className="bg-[#275FC1] text-white">
            Next
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
