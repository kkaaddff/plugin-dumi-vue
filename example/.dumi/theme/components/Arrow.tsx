import classNames from 'classnames';
import './Arrow.less';

export function Arrow(props: { down: boolean }) {
  return (
    <svg
      t="1640401800888"
      className={classNames(
        '__dumi-icon--arrow',
        props.down || '__dumi-icon--arrow--up',
      )}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2022"
      width="64"
      height="64"
    >
      <path
        d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z"
        p-id="2023"
        fill="#666"
      ></path>
    </svg>
  );
}

Arrow.defaultProps = {
  down: true,
};