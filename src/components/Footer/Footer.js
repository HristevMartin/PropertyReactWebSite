import './Footer.css';

const Footer = () => {
    return (
      <div className='footer'>
        <p>© {new Date().getFullYear()} PrimeProp Realty. All rights reserved.</p>
        <p>Privacy Policy | Terms of Use | Cookie Policy</p>
      </div>
    )
  }
  
  export default Footer;
  