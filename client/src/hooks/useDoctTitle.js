import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function UseDocumentTitle(title) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${title} - ${pathname}`;
  }, [title, pathname]);
}

export default UseDocumentTitle;