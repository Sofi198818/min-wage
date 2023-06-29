import PDF from '../../assets/files/help.pdf';

export const HelpSection = () => {
  return (
    <>
      <div style={{ marginTop: 40 }}>
        <a href={PDF} target="_blank">
          მომხმარებლის სახელმძღვანელო
        </a>
      </div>
      <div style={{ marginTop: 10 }}>
        <a href={'https://www.youtube.com/watch?v=y7QvA_W0nLs'} target="_blank">
          ვიდეო ინსტრუქცია
        </a>
      </div>
    </>
  );
};
