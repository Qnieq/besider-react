import { useInView } from 'react-intersection-observer';
import LoadingIndicator from '../../ui/LoadingIndicator';

const LazyImage: React.FC<{ src: string; alt?: string }> = ({ src, alt }) => {
    const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '1500px' });

    return (
        <div ref={ref} className="w-[99px] h-[74px] overflow-hidden mt-[24px]">
            {inView ? <img src={src} alt={alt} loading="lazy" className="w-full h-auto" /> : <LoadingIndicator />}
        </div>
    );
};

export default LazyImage;