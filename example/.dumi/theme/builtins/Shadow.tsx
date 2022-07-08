function Shadow(props: { val: string }): JSX.Element {
  return (
    <span
      className="__design-shadow"
      style={{ boxShadow: props.val, width: 109, height: 54, display: 'block' }}
    ></span>
  );
}

export default Shadow;
